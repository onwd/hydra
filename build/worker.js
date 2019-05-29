"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var message_1 = require("./message");
var worker_events_1 = require("./worker-events");
var Worker = /** @class */ (function () {
    function Worker(options) {
        this.url = options.url || 'ws://localhost:9000';
        this.wss = null;
    }
    Worker.prototype.start = function () {
        this.connect();
    };
    Worker.prototype.stop = function () {
        this.disconnect();
    };
    Worker.prototype.connect = function () {
        if (this.wss) {
            return;
        }
        this.wss = new WebSocket(this.url);
        this.wss.on('open', this.onConnected.bind(this));
        this.wss.on('message', this.onMessageReceived.bind(this));
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
        var message = new message_1.default({ event: event, data: data });
        this.wss.send(message.serialize());
    };
    Worker.prototype.onMessageReceived = function (message) {
        var deserializedMessage = message_1.default.deserialize(message);
        this.processMessage(deserializedMessage);
    };
    Worker.prototype.processMessage = function (message) {
        worker_events_1.default[message.event](message.data);
    };
    return Worker;
}());
exports.default = Worker;
