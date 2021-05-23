"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class PostNotFoundException extends common_1.NotFoundException {
    constructor(postId) {
        super(`Post with id ${postId} not found`);
    }
}
exports.PostNotFoundException = PostNotFoundException;
//# sourceMappingURL=postNotFound.exception.js.map