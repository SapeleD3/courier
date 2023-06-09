import Courier from '../Courier';
import { Providers } from '../enums';
import { ICourier } from '../interface';
import { Message } from '../types';

describe('Courier Integration Test', () => {
  let courier: ICourier;

  beforeEach(() => {
    courier = new Courier({ courierProvider: Providers.GCP_PUBSUB });
  });

  test('should send message using the active provider', async () => {
    const message: Message = {
      topic: 'Test message',
      data: 'send a random message',
    };
    const response = await courier.sendMessage(message);
    expect(response).toBe('GCP Sending cloud message !!!!!!');
  });

  test('should receive message using the active provider', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const message = 'Test message';
    await courier.recieveMessage(message);
    expect(consoleSpy).toHaveBeenCalledWith('Sending cloud message !!!!!!');
    consoleSpy.mockRestore();
  });

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
