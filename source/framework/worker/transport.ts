import { Message } from '../core/message';

export abstract class Transport {
  public onConnected: () => any;
  public onMessageReceived: (message: Message) => any;

  constructor(transport?: Partial<Transport>) {
    this.onConnected = transport?.onConnected ?? (() => undefined);
    this.onMessageReceived = transport?.onMessageReceived ?? (() => undefined);
  }

  public abstract connect(): void;
  public abstract disconnect(): void;
  public abstract send(event: string, data?: any): void;

  protected handleConnected(): void {
    this.onConnected();
  }

  protected handleMessageReceived(message: string): void {
    const deserializedMessage = Message.deserialize(message);

    this.onMessageReceived(deserializedMessage);
  }
}
