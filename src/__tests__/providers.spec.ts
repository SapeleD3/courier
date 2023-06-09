import AwsSqsProvider from '../aws';
import { Providers } from '../enums';
import GcpPubSubProvider from '../gcp';
import { Message } from '../types';

describe('AwsSqsProvider', () => {
  // initialize providers
  const provider = new AwsSqsProvider();

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
    const message = 'Test message';
    await provider.recieveMessage(message);
    expect(consoleSpy).toHaveBeenCalledWith('Sending cloud message !!!!!!');
    consoleSpy.mockRestore();
  });
});

describe('GcpPubSubProvider', () => {
  // initialize providers
  const provider = new GcpPubSubProvider();

  test('should have the correct name', () => {
    expect(provider.name).toBe(Providers.GCP_PUBSUB);
  });

  test('sendMessage should return the correct response', async () => {
    const message: Message = {
      topic: 'test-message',
      data: 'some message',
    };
    const response = await provider.sendMessage(message);
    expect(response).toBe('GCP Sending cloud message !!!!!!');
  });

  test('receiveMessage should log the correct message', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const message = 'Test message';
    await provider.recieveMessage(message);
    expect(consoleSpy).toHaveBeenCalledWith('Sending cloud message !!!!!!');
    consoleSpy.mockRestore();
  });
});
