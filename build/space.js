"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Space = /** @class */ (function () {
    function Space(options) {
        this.type = options.type || 'array';
        this.values = options.values || [];
        this.getNextValue = options.getNextValue || null;
    }
    return Space;
}());
exports.default = Space;
