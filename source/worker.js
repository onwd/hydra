class Worker {
  constructor(options) {
    this.url = options.url || 'wss://localhost:9000';
  }

  start() { }

  stop() { }
}

module.exports = Worker;
