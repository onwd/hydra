"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWebsocketTransport = void 0;
var WebSocket = require("ws");
var message_1 = require("../core/message");
var transport_1 = require("./transport");
var NodeWebsocketTransport = /** @class */ (function (_super) {
    __extends(NodeWebsocketTransport, _super);
    function NodeWebsocketTransport(transport) {
        var _a, _b;
        var _this = _super.call(this, transport) || this;
        _this.url = (_a = transport === null || transport === void 0 ? void 0 : transport.url) !== null && _a !== void 0 ? _a : 'ws://localhost:9000';
        _this.ws = (_b = transport === null || transport === void 0 ? void 0 : transport.ws) !== null && _b !== void 0 ? _b : null;
        return _this;
    }
    NodeWebsocketTransport.prototype.connect = function () {
        if (!this.ws) {
            this.ws = new WebSocket(this.url);
            this.ws.on('open', this.handleConnected.bind(this));
            this.ws.on('close', this.handleConnectionClosed.bind(this));
            this.ws.on('message', this.handleMessageReceived.bind(this));
            this.ws.on('error', this.handleError.bind(this));
        }
    };
    NodeWebsocketTransport.prototype.disconnect = function () {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    };
    NodeWebsocketTransport.prototype.send = function (event, data) {
        var message = new message_1.Message({ event: event, data: data });
        this.ws.send(message.serialize());
    };
    return NodeWebsocketTransport;
}(transport_1.Transport));
exports.NodeWebsocketTransport = NodeWebsocketTransport;
