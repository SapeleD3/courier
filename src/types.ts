import { Providers } from './enums';
import { CredentialBody } from './interface';

export type ProviderConfigurations = {
  gcpPubsub?: CredentialBody;
};

export type Message = {
  topic: string;
  data: string;
  config?: any;
};

export type RecieverConfig = {
  timeout?: number;
};

export type MessageRecieverProps = {
  name: string;
  config?: RecieverConfig;
};

export type CourierPayload = {
  courierProvider?: Providers;
  config?: ProviderConfigurations;
};

export type CourierProviderPayload = {
  config?: ProviderConfigurations;
};
