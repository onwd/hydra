"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
var ws_1 = require("ws");
var message_1 = require("../core/message");
var events_1 = require("./events");
var Master = /** @class */ (function () {
    function Master(master) {
        var _a, _b, _c;
        this.port = (_a = master === null || master === void 0 ? void 0 : master.port) !== null && _a !== void 0 ? _a : 9000;
        this.task = (_b = master === null || master === void 0 ? void 0 : master.task) !== null && _b !== void 0 ? _b : null;
        this.wss = (_c = master === null || master === void 0 ? void 0 : master.wss) !== null && _c !== void 0 ? _c : null;
    }
    Master.prototype.start = function () {
        this.startServer();
    };
    Master.prototype.stop = function () {
        this.stopServer();
    };
    Master.prototype.startServer = function () {
        if (!this.wss) {
            this.wss = new ws_1.Server({
                port: this.port
            });
            this.wss.on('connection', this.onWorkerConnected.bind(this));
            this.wss.on('message', this.onMessageReceived.bind(this));
        }
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
        var deserializedMessage = message_1.Message.deserialize(message);
        this.processMessage(deserializedMessage);
    };
    Master.prototype.processMessage = function (message) {
        events_1.events[message.event](message.data);
    };
    return Master;
}());
exports.Master = Master;
