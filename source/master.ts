import masterEvents from './master-events';
import Message from './message';
import Task from './task';
import { Server } from 'ws';

export default class Master {
  public port: number;
  public tasks: Array<Task>;
  public wss: Server;

  constructor(options: any) {
    this.port = options.port || 9000;
    this.tasks = options.tasks || [];
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

  private onWorkerConnected(ws: any) {
    console.log('Worker connected');

    ws.on('message', (data) => {
      this.onMessageReceived(ws, data);
    });
  }

  private onMessageReceived(ws: any, message: string) {
    console.log('Message received from worker', ws, message);

    const deserializedMessage = Message.deserialize(message);

    this.processMessage(deserializedMessage);
  }

  private processMessage(message: Message): void {
    masterEvents[message.event](message.data);
  }
}
