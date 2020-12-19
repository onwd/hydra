"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var events_1 = require("./events");
var Worker = /** @class */ (function () {
    function Worker(worker) {
        var _a, _b, _c, _d;
        this.transport = (_a = worker === null || worker === void 0 ? void 0 : worker.transport) !== null && _a !== void 0 ? _a : null;
        this.onConnected = (_b = worker === null || worker === void 0 ? void 0 : worker.onConnected) !== null && _b !== void 0 ? _b : (function () { return undefined; });
        this.onConnectionClosed = (_c = worker === null || worker === void 0 ? void 0 : worker.onConnectionClosed) !== null && _c !== void 0 ? _c : (function () { return undefined; });
        this.onMessageReceived = (_d = worker === null || worker === void 0 ? void 0 : worker.onMessageReceived) !== null && _d !== void 0 ? _d : (function () { return undefined; });
    }
    Worker.prototype.start = function () {
        this.transport.onConnected = this.handleConnected.bind(this);
        this.transport.onConnectionClosed = this.handleConnectionClosed.bind(this);
        this.transport.onMessageReceived = this.handleMessageReceived.bind(this);
        this.transport.connect();
    };
    Worker.prototype.stop = function () {
        this.transport.disconnect();
    };
    Worker.prototype.sendMessage = function (event, data) {
        this.transport.send(event, data);
    };
    Worker.prototype.handleConnected = function () {
        this.onConnected();
        this.requestWork();
    };
    Worker.prototype.handleConnectionClosed = function () {
        this.onConnectionClosed();
    };
    Worker.prototype.handleMessageReceived = function (message) {
        this.onMessageReceived(message);
        this.processMessage(message);
    };
    Worker.prototype.requestWork = function () {
        this.sendMessage('work-request');
    };
    Worker.prototype.processMessage = function (message) {
        events_1.events[message.event](message.data);
    };
    return Worker;
}());
exports.Worker = Worker;
