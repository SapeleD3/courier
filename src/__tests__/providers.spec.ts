import AwsSqsProvider from '../aws';
import { Providers } from '../enums';
import GcpPubSubProvider from '../gcp';
import { Message } from '../types';

describe('AwsSqsProvider', () => {
  // initialize providers
  const provider = new AwsSqsProvider({});

  test('should have the correct name', () => {
    expect(provider.name).toBe(Providers.AWS_SQS);
  });

  test('sendMessage should return the correct response', async () => {
    const message: Message = {
      topic: 'test-message',
      data: 'some message',
    };
    const response = await provider.sendMessage(message);
    expect(response).toBe('AWS Sending cloud message !!!!!!');
  });

  test('receiveMessage should log the correct message', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await provider.recieveMessage({ name: 'test-sub' });
    expect(consoleSpy).toHaveBeenCalledWith('Sending cloud message !!!!!!');
    consoleSpy.mockRestore();
  });
});

describe('GcpPubSubProvider', () => {
  // initialize providers
  const provider = new GcpPubSubProvider({
    config: {
      gcpPubsub: {
        clientEmail: process.env.CLIENT_EMAIL as string,
        privateKey: process.env.PRIVATE_KEY as string,
        projectId: process.env.PROJECT_ID as string,
      },
    },
  });

  test('should have the correct name', () => {
    expect(provider.name).toBe(Providers.GCP_PUBSUB);
  });

  test('sendMessage should return the correct response', async () => {
    const message: Message = {
      topic: 'test',
      data: 'some message',
    };
    const response = await provider.sendMessage(message);
    expect(typeof response).toBe('string');
  });
});
