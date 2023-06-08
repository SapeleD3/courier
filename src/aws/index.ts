import { Providers } from '../enums';
import { ICourierProvider } from '../interface';
import { Message } from '../types';

class AwsSqsProvider implements ICourierProvider {
  name = Providers.AWS_SQS;

  constructor() {
    console.log('AWS PROVIDER WAS INITIALIZED');
  }

  async sendMessage(message: Message): Promise<string> {
    return 'AWS Sending cloud message !!!!!!';
  }

  async recieveMessage(message: any): Promise<void> {
    console.log('Sending cloud message !!!!!!');
  }
}

export default AwsSqsProvider;
