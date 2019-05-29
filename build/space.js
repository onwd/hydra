export default class Space {
    constructor(options) {
        this.type = options.type || 'array';
        this.values = options.values || [];
        this.getNextValue = options.getNextValue || null;
    }
}
