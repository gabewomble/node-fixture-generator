"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const node_fetch_1 = __importDefault(require("node-fetch"));
class RequestFactory {
    constructor(options) {
        var _a;
        this.baseURL = (_a = options === null || options === void 0 ? void 0 : options.baseURL) !== null && _a !== void 0 ? _a : '';
        this.requests = options.requests;
    }
    request(config) {
        console.log(`${this.baseURL}${config.url}`);
        return node_fetch_1.default(`${this.baseURL}${config.url}`);
    }
    compileRequests(mapFn, onError) {
        this.requests.forEach((request) => {
            this.request(request)
                .then((res) => {
                res.json().then((data) => {
                    mapFn({ data, name: request.name });
                });
            })
                .catch(onError);
        });
    }
}
exports.default = RequestFactory;
//# sourceMappingURL=request.js.map