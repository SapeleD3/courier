import Courier from '../Courier';
import { Providers } from '../enums';
import { ICourier } from '../interface';

describe('Courier Integration Test', () => {
  let courier: ICourier;

  beforeEach(() => {
    courier = new Courier({
      courierProvider: Providers.GCP_PUBSUB,
      config: {
        gcpPubsub: {
          clientEmail: process.env.CLIENT_EMAIL as string,
          privateKey: process.env.PRIVATE_KEY as string,
          projectId: process.env.PROJECT_ID as string,
        },
      },
    });
  });

  test('should send message using the active provider', async () => {
    const response = await courier.getActiveProviderName();
    expect(response).toBe(Providers.GCP_PUBSUB);
  });

  test('should receive message using the active provider', async () => {});

  test('should update the courier provider', () => {
    courier.setCourierProvider({ courierProvider: Providers.AWS_SQS });
    const activeProvider = courier.getActiveProviderName();
    expect(activeProvider).toBe(Providers.AWS_SQS);
  });

  test('should update the courier provider to default provider', () => {
    courier.setCourierProvider({});
    const activeProvider = courier.getActiveProviderName();
    expect(activeProvider).toBe(Providers.GCP_PUBSUB);
  });

  test('should get the active courier provider', () => {
    const activeProvider = courier.getActiveProviderName();
    expect(activeProvider).toBe(Providers.GCP_PUBSUB);
  });
});
