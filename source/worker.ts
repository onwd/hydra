import * as WebSocket from 'ws';

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
  }

  private onMessageReceived(data: any) {
    console.log('Received message from master', data);
  }
}
