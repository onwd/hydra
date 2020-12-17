"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(task) {
        var _a, _b, _c, _d;
        this.dependencies = (_a = task === null || task === void 0 ? void 0 : task.dependencies) !== null && _a !== void 0 ? _a : [];
        this.f = (_b = task === null || task === void 0 ? void 0 : task.f) !== null && _b !== void 0 ? _b : null;
        this.space = (_c = task === null || task === void 0 ? void 0 : task.space) !== null && _c !== void 0 ? _c : null;
        this.getSubspace = (_d = task === null || task === void 0 ? void 0 : task.getSubspace) !== null && _d !== void 0 ? _d : null;
    }
    return Task;
}());
exports.Task = Task;
