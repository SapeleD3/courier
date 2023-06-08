import { Providers } from './enums';
import { Message } from './types';

export interface ICourierProvider {
  name: Providers;
  sendMessage(message: Message): Promise<string>;
  recieveMessage(message: any): Promise<void>;
}

export interface ICourier {
  sendMessage(message: Message): Promise<string>;
  recieveMessage(message: any): Promise<void>;
  setCourierProvider(message: any): void;
  getActiveProviderName(): Providers;
}
