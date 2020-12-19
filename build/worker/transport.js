"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
var message_1 = require("../core/message");
var Transport = /** @class */ (function () {
    function Transport(transport) {
        var _a, _b, _c, _d;
        this.onConnected = (_a = transport === null || transport === void 0 ? void 0 : transport.onConnected) !== null && _a !== void 0 ? _a : (function () { return undefined; });
        this.onConnectionClosed = (_b = transport === null || transport === void 0 ? void 0 : transport.onConnectionClosed) !== null && _b !== void 0 ? _b : (function () { return undefined; });
        this.onMessageReceived = (_c = transport === null || transport === void 0 ? void 0 : transport.onMessageReceived) !== null && _c !== void 0 ? _c : (function () { return undefined; });
        this.onError = (_d = transport === null || transport === void 0 ? void 0 : transport.onError) !== null && _d !== void 0 ? _d : (function () { return undefined; });
    }
    Transport.prototype.handleConnected = function () {
        this.onConnected();
    };
    Transport.prototype.handleConnectionClosed = function () {
        this.onConnectionClosed();
    };
    Transport.prototype.handleMessageReceived = function (message) {
        var deserializedMessage = message_1.Message.deserialize(message);
        this.onMessageReceived(deserializedMessage);
    };
    Transport.prototype.handleError = function (error) {
        this.onError(error);
    };
    return Transport;
}());
exports.Transport = Transport;
