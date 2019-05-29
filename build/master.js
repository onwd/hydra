"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var master_events_1 = require("./master-events");
var message_1 = require("./message");
var ws_1 = require("ws");
var Master = /** @class */ (function () {
    function Master(options) {
        this.port = options.port || 9000;
        this.tasks = options.tasks || [];
        this.wss = null;
    }
    Master.prototype.start = function () {
        this.startServer();
    };
    Master.prototype.stop = function () {
        this.stopServer();
    };
    Master.prototype.startServer = function () {
        if (this.wss) {
            return;
        }
        this.wss = new ws_1.Server({
            port: this.port
        });
        this.wss.on('connection', this.onWorkerConnected.bind(this));
        this.wss.on('message', this.onMessageReceived.bind(this));
    };
    Master.prototype.stopServer = function () {
        if (this.wss) {
            this.wss.close();
            this.wss = null;
        }
    };
    Master.prototype.onWorkerConnected = function (ws) {
        var _this = this;
        ws.on('message', function (data) {
            _this.onMessageReceived(ws, data);
        });
    };
    Master.prototype.onMessageReceived = function (ws, message) {
        var deserializedMessage = message_1.default.deserialize(message);
        this.processMessage(deserializedMessage);
    };
    Master.prototype.processMessage = function (message) {
        master_events_1.default[message.event](message.data);
    };
    return Master;
}());
exports.default = Master;
