import { Message } from '../core/message';
import { events } from './events';
import { Transport } from './transport';

export class Worker {
  public transport: Transport;

  constructor(worker?: Partial<Worker>) {
    this.transport = worker?.transport ?? null;
  }

  public start(): void {
    this.transport.onConnected = this.onConnected.bind(this);
    this.transport.onMessageReceived = this.onMessageReceived.bind(this);

    this.transport.connect();
  }

  public stop(): void {
    this.transport.disconnect();
  }

  private sendMessage(event: string, data?: any): void {
    this.transport.send(event, data);
  }

  private onConnected(): void {
    this.requestWork();
  }

  private onMessageReceived(message: Message): void {
    this.processMessage(message);
  }

  private requestWork(): void {
    this.sendMessage('work-request');
  }

  private processMessage(message: Message): void {
    events[message.event](message.data);
  }
}
