const WebSocket = require('ws');

class Master {
  constructor(options) {
    this.port = options.port || 9000;
    this.tasks = options.tasks || [];
    this.wss = null;
  }

  start() {
    if (this.wss) {
      return;
    }

    this.wss = new WebSocket.Server({
      port: this.port
    });

    this.wss.on('open', () => {
      console.log('Client connected');
    });

    this.wss.on('message', (data) => {
      console.log('Message received', data);
    });
  }

  stop() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }
}

module.exports = Master;
