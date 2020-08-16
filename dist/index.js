"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("./lib/request"));
const write_1 = __importDefault(require("./lib/write"));
const fixtureGenerator = ({ requestConfig, outDir, }) => {
    if (Array.isArray(requestConfig)) {
        requestConfig.forEach((configChild) => {
            fixtureGenerator({
                requestConfig: configChild,
                outDir,
            });
        });
    }
    else if (requestConfig && typeof requestConfig === 'object') {
        const Factory = new request_1.default(requestConfig);
        const Writer = new write_1.default(outDir);
        return Factory.compileRequests((val) => Writer.write(val), console.error);
    }
    throw new Error('invalid config provided');
};
exports.default = fixtureGenerator;
//# sourceMappingURL=index.js.map