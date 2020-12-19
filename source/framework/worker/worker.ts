import { Message } from '../core/message';
import { events } from './events';
import { Transport } from './transport';

export class Worker {
  public transport: Transport;
  public onConnected: () => any;
  public onMessageReceived: (message: Message) => any;

  constructor(worker?: Partial<Worker>) {
    this.transport = worker?.transport ?? null;
    this.onConnected = worker?.onConnected ?? (() => undefined);
    this.onMessageReceived = worker?.onMessageReceived ?? (() => undefined);
  }

  public start(): void {
    this.transport.onConnected = this.handleConnected.bind(this);
    this.transport.onMessageReceived = this.handleMessageReceived.bind(this);

    this.transport.connect();
  }

  public stop(): void {
    this.transport.disconnect();
  }

  private sendMessage(event: string, data?: any): void {
    this.transport.send(event, data);
  }

  private handleConnected(): void {
    this.onConnected();
    this.requestWork();
  }

  private handleMessageReceived(message: Message): void {
    this.onMessageReceived(message);
    this.processMessage(message);
  }

  private requestWork(): void {
    this.sendMessage('work-request');
  }

  private processMessage(message: Message): void {
    events[message.event](message.data);
  }
}
