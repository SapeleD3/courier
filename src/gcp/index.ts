import { Providers } from '../enums';
import { ICourierProvider } from '../interface';
import {
  CourierProviderPayload,
  Message,
  MessageRecieverProps,
} from '../types';
import {
  ClientConfig,
  PubSub,
  Message as PubsubMessage,
} from '@google-cloud/pubsub';

class GcpPubSubProvider implements ICourierProvider {
  name = Providers.GCP_PUBSUB;
  private client: PubSub;

  constructor(payload: CourierProviderPayload) {
    this.checkProviderAuthentication(payload);
  }

  async sendMessage(payload: Message): Promise<string> {
    const { topic, data } = payload;
    /**
     * These is a non-zero chance that messages will be sent more than once
     * to a subscriber.
     *
     * Leverage the messageId to assure idempotent operations
     */
    const publisherTopic = this.client.topic(topic);
    let messageId = '';

    try {
      messageId = await publisherTopic.publishMessage({
        data: Buffer.from(data),
      });
    } catch (error) {
      throw new Error(`error sending message: ${error}`);
    }

    return messageId;
  }

  async recieveMessage(payload: MessageRecieverProps): Promise<string[]> {
    const { name, config } = payload;

    // default to 5seconds
    const subTimeout = config?.timeout || 5;
    const subscription = this.client.subscription(name);

    const ackedMessages = new Promise((resolve, reject) => {
      const messages: string[] = [];
      const messageHandler = (message: PubsubMessage) => {
        messages.push(message.data.toString());
        // "Ack" (acknowledge receipt of) the message
        message.ack();
      };

      const errorHandler = (error: Error) => {
        subscription.removeListener('message', messageHandler);
        reject(error);
      };

      // Listeners
      subscription.on('message', messageHandler);
      subscription.on('error', errorHandler);

      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        subscription.removeListener('error', errorHandler);

        resolve(messages);
      }, subTimeout * 1000);
    });

    try {
      const response = (await ackedMessages) as string[];
      return response;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  private checkProviderAuthentication(payload: CourierProviderPayload) {
    const isGoogleCredentialsExported =
      process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const isConfigProvided = payload?.config?.gcpPubsub;

    if (!isGoogleCredentialsExported && !isConfigProvided) {
      throw new Error(
        'Authentication error: please authenticate pubsub provider with either one of the below steps \n 1. export GOOGLE_APPLICATION_CREDENTIALS to the location of your service-account.json \n 2. pass in the config property for gcpPubsub ie. (client_email and private_key) \n to authorize publishing and recieving messages'
      );
    }
    const props: ClientConfig = {};

    if (isConfigProvided) {
      const { clientEmail, privateKey, projectId } = isConfigProvided;
      props['credentials'] = {
        client_email: clientEmail,
        private_key: privateKey,
      };
      props['projectId'] = projectId;
    }

    this.client = new PubSub(props);
  }
}

export default GcpPubSubProvider;
