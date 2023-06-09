import { Providers } from './enums';
import { ICourier, ICourierProvider } from './interface';
import { CourierPayload, Message, MessageRecieverProps } from './types';
import { switchProvider } from './utils';
import { config } from 'dotenv';

config();

class Courier implements ICourier {
  private provider: ICourierProvider;

  constructor(payload: CourierPayload) {
    this.setCourierProvider(payload);
  }

  public async sendMessage(message: Message): Promise<string> {
    return this.provider.sendMessage(message);
  }

  public async recieveMessage(
    message: MessageRecieverProps
  ): Promise<string[]> {
    return this.provider.recieveMessage(message);
  }

  // NOTE: this method is public, indicating that the provider can be updated after instantiation
  public setCourierProvider(payload: CourierPayload): void {
    this.provider = switchProvider(payload);
  }

  public getActiveProviderName(): Providers {
    return this.provider.name;
  }
}

export default Courier;
