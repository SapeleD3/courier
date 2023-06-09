import { Providers } from './enums';
import { CourierPayload, Message, MessageRecieverProps } from './types';

export interface ICourierProvider {
  name: Providers;
  sendMessage(message: Message): Promise<string>;
  recieveMessage(message: MessageRecieverProps): Promise<string[]>;
}

export interface ICourier {
  sendMessage(message: Message): Promise<string>;
  recieveMessage(message: MessageRecieverProps): Promise<string[]>;
  setCourierProvider(payload: CourierPayload): void;
  getActiveProviderName(): Providers;
}

export interface CredentialBody {
  clientEmail: string;
  privateKey: string;
  projectId: string;
}
