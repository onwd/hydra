export default class Task {
    constructor(options) {
        this.dependencies = options.dependencies || [];
        this.f = options.f || null;
        this.space = options.space || null;
        this.getSubspace = options.getSubspace || null;
    }
}
