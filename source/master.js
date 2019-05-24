const WebSocket = require('ws');

class Master {
  constructor(options) {
    this.port = options.port || 9000;
    this.tasks = options.tasks || [];
    this.wss = null;
  }

  start() {
    this.startServer();
  }

  startServer() {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket.Server({
      port: this.port
    });

    this.wss.on('open', this.onClientConnected.bind(this));
    this.wss.on('message', this.onMessageReceived.bind(this));
  }

  stop() {
    this.stopServer();
  }

  stopServer() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }

  onClientConnected() {
    console.log('Worker connected');
  }

  onMessageReceived(data) {
    console.log('Message received from worker', data);
  }
}

module.exports = Master;
