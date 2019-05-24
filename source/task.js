class Task {
  constructor(options) {
    this.dependencies = options.dependencies || [];
    this.compute = options.compute || null;
    this.space = options.space || null;
  }
}

module.exports = Task;
