"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(options) {
        this.dependencies = options.dependencies || [];
        this.f = options.f || null;
        this.space = options.space || null;
        this.getSubspace = options.getSubspace || null;
    }
    return Task;
}());
exports.default = Task;
