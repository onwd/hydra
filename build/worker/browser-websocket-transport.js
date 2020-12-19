"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserWebsocketTransport = void 0;
var message_1 = require("../core/message");
var transport_1 = require("./transport");
var BrowserWebsocketTransport = /** @class */ (function (_super) {
    __extends(BrowserWebsocketTransport, _super);
    function BrowserWebsocketTransport(transport) {
        var _a, _b;
        var _this = _super.call(this, transport) || this;
        _this.url = (_a = transport === null || transport === void 0 ? void 0 : transport.url) !== null && _a !== void 0 ? _a : 'ws://localhost:9000';
        _this.ws = (_b = transport === null || transport === void 0 ? void 0 : transport.ws) !== null && _b !== void 0 ? _b : null;
        return _this;
    }
    BrowserWebsocketTransport.prototype.connect = function () {
        if (!this.ws) {
            this.ws = new WebSocket(this.url);
            this.ws.onopen = this.handleConnected.bind(this);
            this.ws.onclose = this.handleConnectionClosed.bind(this);
            this.ws.onmessage = this.handleMessageReceived.bind(this);
            this.ws.onerror = this.handleError.bind(this);
        }
    };
    BrowserWebsocketTransport.prototype.disconnect = function () {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    };
    BrowserWebsocketTransport.prototype.send = function (event, data) {
        var message = new message_1.Message({ event: event, data: data });
        this.ws.send(message.serialize());
    };
    return BrowserWebsocketTransport;
}(transport_1.Transport));
exports.BrowserWebsocketTransport = BrowserWebsocketTransport;
