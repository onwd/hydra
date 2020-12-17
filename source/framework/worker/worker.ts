import * as WebSocket from 'ws';
import { Message } from '../core/message';
import { events } from './events';

export class Worker {
  public url: string;
  public wss: any;

  constructor(worker?: Partial<Worker>) {
    this.url = worker?.url ?? 'ws://localhost:9000';
    this.wss = worker?.wss ?? null;
  }

  public start(): void {
    this.connect();
  }

  public stop(): void {
    this.disconnect();
  }

  private connect(): void {
    if (!this.wss) {
      this.wss = new WebSocket(this.url);

      this.wss.on('open', this.onConnected.bind(this));
      this.wss.on('message', this.onMessageReceived.bind(this));
    }
  }

  private disconnect(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  private onConnected(): void {
    this.requestWork();
  }

  private requestWork(): void {
    this.sendMessage('work-request');
  }

  private sendMessage(event: string, data?: any): void {
    const message = new Message({ event, data });

    this.wss.send(message.serialize());
  }

  private onMessageReceived(message: string): void {
    const deserializedMessage = Message.deserialize(message);

    this.processMessage(deserializedMessage);
  }

  private processMessage(message: Message): void {
    events[message.event](message.data);
  }
}
