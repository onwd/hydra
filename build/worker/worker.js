"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var WebSocket = require("ws");
var message_1 = require("../core/message");
var events_1 = require("./events");
var Worker = /** @class */ (function () {
    function Worker(worker) {
        var _a, _b;
        this.url = (_a = worker === null || worker === void 0 ? void 0 : worker.url) !== null && _a !== void 0 ? _a : 'ws://localhost:9000';
        this.wss = (_b = worker === null || worker === void 0 ? void 0 : worker.wss) !== null && _b !== void 0 ? _b : null;
    }
    Worker.prototype.start = function () {
        this.connect();
    };
    Worker.prototype.stop = function () {
        this.disconnect();
    };
    Worker.prototype.connect = function () {
        if (!this.wss) {
            this.wss = new WebSocket(this.url);
            this.wss.on('open', this.onConnected.bind(this));
            this.wss.on('message', this.onMessageReceived.bind(this));
        }
    };
    Worker.prototype.disconnect = function () {
        if (this.wss) {
            this.wss.close();
            this.wss = null;
        }
    };
    Worker.prototype.onConnected = function () {
        this.requestWork();
    };
    Worker.prototype.requestWork = function () {
        this.sendMessage('work-request');
    };
    Worker.prototype.sendMessage = function (event, data) {
        var message = new message_1.Message({ event: event, data: data });
        this.wss.send(message.serialize());
    };
    Worker.prototype.onMessageReceived = function (message) {
        var deserializedMessage = message_1.Message.deserialize(message);
        this.processMessage(deserializedMessage);
    };
    Worker.prototype.processMessage = function (message) {
        events_1.events[message.event](message.data);
    };
    return Worker;
}());
exports.Worker = Worker;
