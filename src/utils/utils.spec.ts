import AwsSqsProvider from '../aws';
import { Providers } from '../enums';
import GcpPubSubProvider from '../gcp';
import switchProvider from './switchProvider';

describe('switchProvider', () => {
  test('should return an instance of AwsSqsProvider for AWS_SQS provider', () => {
    const provider = switchProvider({ courierProvider: Providers.AWS_SQS });
    expect(provider instanceof AwsSqsProvider).toBe(true);
  });

  test('should return an instance of GcpPubSubProvider for GCP_PUBSUB provider', () => {
    const provider = switchProvider({ courierProvider: Providers.GCP_PUBSUB });
    expect(provider instanceof GcpPubSubProvider).toBe(true);
  });

  test('should return an instance of GcpPubSubProvider for unknown providers', () => {
    const provider = switchProvider({});
    expect(provider instanceof GcpPubSubProvider).toBe(true);
  });
});
