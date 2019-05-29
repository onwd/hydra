import * as WebSocket from 'ws';
import events from './events';
import Message from '../core/message';

export default class Worker {
  public url: string;
  public wss: any;

  constructor(options: any) {
    this.url = options.url || 'ws://localhost:9000';
    this.wss = null;
  }

  public start(): void {
    this.connect();
  }

  public stop(): void {
    this.disconnect();
  }

  private connect(): void {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket(this.url);

    this.wss.on('open', this.onConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
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