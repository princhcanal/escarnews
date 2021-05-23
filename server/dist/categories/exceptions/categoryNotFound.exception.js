"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class CategoryNotFoundException extends common_1.NotFoundException {
    constructor(categoryId) {
        super(`Category with id ${categoryId} not found`);
    }
}
exports.CategoryNotFoundException = CategoryNotFoundException;
//# sourceMappingURL=categoryNotFound.exception.js.map