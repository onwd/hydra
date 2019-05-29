"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(message) {
        this.event = message.event || '';
        this.data = message.data || null;
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
exports.default = Message;
