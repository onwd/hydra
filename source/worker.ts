import * as WebSocket from 'ws';
import Message from './message';
import workerEvents from './worker-events';

export default class Worker {
  public url: string;
  public wss: any;

  constructor(options: any) {
    this.url = options.url || 'wss://localhost:9000';
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
    console.log('Connected to master');

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
    console.log('Received message from master', message);

    const deserializedMessage = Message.deserialize(message);

    this.processMessage(deserializedMessage);
  }

  private processMessage(message: Message): void {
    workerEvents[message.event](message.data);
  }
}
