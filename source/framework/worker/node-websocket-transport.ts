import * as WebSocket from 'ws';
import { Message } from '../core/message';
import { Transport } from './transport';

export class NodeWebsocketTransport extends Transport {
  public url: string;
  public ws: WebSocket;

  constructor(transport?: Partial<NodeWebsocketTransport>) {
    super(transport);

    this.url = transport?.url ?? 'ws://localhost:9000';
    this.ws = transport?.ws ?? null;
  }

  public connect(): void {
    if (!this.ws) {
      this.ws = new WebSocket(this.url);

      this.ws.on('open', this.handleConnected.bind(this));
      this.ws.on('message', this.handleMessageReceived.bind(this));
    }
  }

  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public send(event: string, data?: any): void {
    const message = new Message({ event, data });

    this.ws.send(message.serialize());
  }
}
