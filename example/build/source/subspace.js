export default class Subspace {
    constructor(options) {
        this.type = options.type || 'array';
        this.values = options.values || [];
    }
}
