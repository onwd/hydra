import events from './events';
import Message from '../core/message';
import Task from '../core/task';
import { Server } from 'ws';

export default class Master {
  public port: number;
  public task: Task;
  public wss: Server;

  constructor(options: any) {
    this.port = options.port || 9000;
    this.task = options.task || null;
    this.wss = null;
  }

  public start(): void {
    this.startServer();
  }

  public stop(): void {
    this.stopServer();
  }

  private startServer(): void {
    if (this.wss) {
      return;
    }

    this.wss = new Server({
      port: this.port
    });

    this.wss.on('connection', this.onWorkerConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
  }

  private stopServer(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  private onWorkerConnected(ws: any): void {
    ws.on('message', (data) => {
      this.onMessageReceived(ws, data);
    });
  }

  private onMessageReceived(ws: any, message: string): void {
    const deserializedMessage = Message.deserialize(message);

    this.processMessage(deserializedMessage);
  }

  private processMessage(message: Message): void {
    events[message.event](message.data);
  }
}
