import { Providers } from '../enums';
import { ICourierProvider } from '../interface';
import { Message } from '../types';

class GcpPubSubProvider implements ICourierProvider {
  name = Providers.GCP_PUBSUB;

  constructor() {
    console.log('GCP PROVIDER WAS INITIALIZED');
  }

  async sendMessage(message: Message): Promise<string> {
    return 'GCP Sending cloud message !!!!!!';
  }

  async recieveMessage(message: any): Promise<void> {
    console.log('Sending cloud message !!!!!!');
  }
}

export default GcpPubSubProvider;
