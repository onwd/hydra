"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var Message = /** @class */ (function () {
    function Message(message) {
        var _a, _b;
        this.event = (_a = message === null || message === void 0 ? void 0 : message.event) !== null && _a !== void 0 ? _a : '';
        this.data = (_b = message === null || message === void 0 ? void 0 : message.data) !== null && _b !== void 0 ? _b : null;
    }
    Message.deserialize = function (message) {
        return new Message(JSON.parse(message));
    };
    Message.prototype.serialize = function () {
        return JSON.stringify({
            event: this.event,
            data: this.data
        });
    };
    return Message;
}());
exports.Message = Message;
