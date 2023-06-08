import { Providers } from './enums';

export type Message = {
  topic: string;
  data: string;
  config?: any;
};

export type CourierPayload = {
  courierProvider?: Providers;
  config?: any;
};
