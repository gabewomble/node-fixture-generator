"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Writer {
    constructor(outDir = '.') {
        this.outDir = outDir;
        if (outDir !== '.') {
            try {
                fs_1.default.readdirSync(outDir);
            }
            catch (_a) {
                fs_1.default.mkdirSync(outDir);
            }
        }
    }
    write({ data, name }) {
        console.log({ data: JSON.stringify(data), name, outDir: this.outDir });
        try {
            fs_1.default.writeFileSync(`${this.outDir}/${name}.json`, JSON.stringify(data, null, 2));
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
exports.default = Writer;
//# sourceMappingURL=write.js.map