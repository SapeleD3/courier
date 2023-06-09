import AwsSqsProvider from '../aws';
import { Providers } from '../enums';
import GcpPubSubProvider from '../gcp';
import { ICourierProvider } from '../interface';
import { CourierPayload } from '../types';

const switchProvider = (payload: CourierPayload): ICourierProvider => {
  const { courierProvider, config = {} } = payload;
  switch (courierProvider) {
    case Providers.AWS_SQS:
      return new AwsSqsProvider({ config });

    default:
      return new GcpPubSubProvider({ config });
  }
};

export default switchProvider;
