import { Providers } from './enums';
import { ICourier, ICourierProvider } from './interface';
import { CourierPayload, Message } from './types';
import { switchProvider } from './utils';

class Courier implements ICourier {
  private provider: ICourierProvider;

  constructor(payload: CourierPayload) {
    this.setCourierProvider(payload);
  }

  public async sendMessage(message: Message): Promise<string> {
    return this.provider.sendMessage(message);
  }

  public async recieveMessage(message: any): Promise<void> {
    return this.provider.recieveMessage(message);
  }

  // NOTE: this method is public, indicating that the provider can be updated after instantiation
  public setCourierProvider({
    courierProvider = Providers.GCP_PUBSUB,
  }: CourierPayload): void {
    this.provider = switchProvider(courierProvider);
  }

  public getActiveProviderName(): Providers {
    return this.provider.name;
  }
}

export default Courier;
