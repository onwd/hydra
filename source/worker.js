const WebSocket = require('ws');

class Worker {
  constructor(options) {
    this.url = options.url || 'wss://localhost:9000';
    this.wss = null;
  }

  start() {
    this.connect();
  }

  stop() {
    this.disconnect();
  }

  connect() {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket(this.url);

    this.wss.on('open', this.onConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
  }

  disconnect() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  onConnected() {
    console.log('Connected to master');
  }

  onMessageReceived(data) {
    console.log('Received message from master', data);
  }
}

module.exports = Worker;
