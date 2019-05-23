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
  }

  stop() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
  }
}

module.exports = Master;
