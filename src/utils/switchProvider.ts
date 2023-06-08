import AwsSqsProvider from '../aws';
import { Providers } from '../enums';
import GcpPubSubProvider from '../gcp';
import { ICourierProvider } from '../interface';

const switchProvider = (courierProvider: Providers): ICourierProvider => {
  switch (courierProvider) {
    case Providers.AWS_SQS:
      return new AwsSqsProvider();

    default:
      return new GcpPubSubProvider();
  }
};

export default switchProvider;
