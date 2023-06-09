import { Providers } from '../enums';
import { ICourierProvider } from '../interface';
import {
  CourierProviderPayload,
  Message,
  MessageRecieverProps,
} from '../types';

class AwsSqsProvider implements ICourierProvider {
  name = Providers.AWS_SQS;

  constructor(payload: CourierProviderPayload) {
    this.checkProviderAuthentication(payload);
  }

  async sendMessage(message: Message): Promise<string> {
    return 'AWS Sending cloud message !!!!!!';
  }

  async recieveMessage(message: MessageRecieverProps): Promise<string[]> {
    console.log('Sending cloud message !!!!!!');
    return [];
  }

  private checkProviderAuthentication(payload: CourierProviderPayload) {}
}

export default AwsSqsProvider;
