"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(task) {
        var _a, _b, _c;
        this.f = (_a = task === null || task === void 0 ? void 0 : task.f) !== null && _a !== void 0 ? _a : null;
        this.space = (_b = task === null || task === void 0 ? void 0 : task.space) !== null && _b !== void 0 ? _b : null;
        this.getSubspace = (_c = task === null || task === void 0 ? void 0 : task.getSubspace) !== null && _c !== void 0 ? _c : null;
    }
    return Task;
}());
exports.Task = Task;
