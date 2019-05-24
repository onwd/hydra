import * as WebSocket from 'ws';

export default class Worker {
  public url: string;
  public wss: any;

  constructor(options) {
    this.url = options.url || 'wss://localhost:9000';
    this.wss = null;
  }

  public start() {
    this.connect();
  }

  public stop() {
    this.disconnect();
  }

  private connect() {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket(this.url);

    this.wss.on('open', this.onConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
  }

  private disconnect() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  private onConnected() {
    console.log('Connected to master');
  }

  private onMessageReceived(data) {
    console.log('Received message from master', data);
  }
}
