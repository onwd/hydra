import * as WebSocket from 'ws';
import Task from './task';

export default class Master {
  public port: number;
  public tasks: Array<Task>;
  public wss: any;

  constructor(options) {
    this.port = options.port || 9000;
    this.tasks = options.tasks || [];
    this.wss = null;
  }

  public start() {
    this.startServer();
  }

  public stop() {
    this.stopServer();
  }

  private startServer() {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket.Server({
      port: this.port
    });

    this.wss.on('connection', this.onWorkerConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
  }

  private stopServer() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  private onWorkerConnected(ws) {
    console.log('Worker connected');

    ws.on('message', (data) => {
      this.onMessageReceived(ws, data);
    });
  }

  private onMessageReceived(ws, data) {
    console.log('Message received from worker', ws, data);
  }
}
