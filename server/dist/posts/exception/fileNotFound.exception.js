"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class FileNotFoundException extends common_1.NotFoundException {
    constructor() {
        super('File not found');
    }
}
exports.FileNotFoundException = FileNotFoundException;
//# sourceMappingURL=fileNotFound.exception.js.map