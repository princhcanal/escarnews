"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const deleteFile = async (filePath) => {
    filePath = path_1.join(filePath);
    fs_1.unlink(filePath, (err) => {
        if (err) {
            console.error('clearImageError:', err);
        }
    });
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=deleteFile.js.map