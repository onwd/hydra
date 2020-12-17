"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
var Space = /** @class */ (function () {
    function Space(space) {
        var _a, _b, _c;
        this.type = (_a = space === null || space === void 0 ? void 0 : space.type) !== null && _a !== void 0 ? _a : 'array';
        this.values = (_b = space === null || space === void 0 ? void 0 : space.values) !== null && _b !== void 0 ? _b : [];
        this.getNextValue = (_c = space === null || space === void 0 ? void 0 : space.getNextValue) !== null && _c !== void 0 ? _c : null;
    }
    return Space;
}());
exports.Space = Space;
