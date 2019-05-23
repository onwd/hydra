class Master {
  constructor(options) {
    this.port = options.port || 9000;
    this.tasks = options.tasks || [];
  }
}

module.exports = Master;
