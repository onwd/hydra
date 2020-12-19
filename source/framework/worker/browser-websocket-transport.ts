import { Message } from '../core/message';
import { Transport } from './transport';

export class BrowserWebsocketTransport extends Transport {
  public url: string;
  public ws: WebSocket;

  constructor(transport?: Partial<BrowserWebsocketTransport>) {
    super(transport);

    this.url = transport?.url ?? 'ws://localhost:9000';
    this.ws = transport?.ws ?? null;
  }

  public connect(): void {
    if (!this.ws) {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = this.handleConnected.bind(this);
      this.ws.onclose = this.handleConnectionClosed.bind(this);
      this.ws.onmessage = this.handleMessageReceived.bind(this);
      this.ws.onerror = this.handleError.bind(this);
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
