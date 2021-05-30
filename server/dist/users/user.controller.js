"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const findOneParams_1 = require("../utils/findOneParams");
const jwtAuthentication_guard_1 = require("../authentication/jwtAuthentication.guard");
const platform_express_1 = require("@nestjs/platform-express");
const requestWithUser_interface_1 = require("../authentication/requestWithUser.interface");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUserById({ id }) {
        return await this.usersService.getById(Number(id));
    }
    async getUserByUsername(username) {
        return await this.usersService.getByUsername(username);
    }
    async updateProfilePicture(req, profilePicture) {
        return await this.usersService.updateProfilePicture(req.user.id, profilePicture, req.user.profilePictureCloudinaryPublicId);
    }
    async updateCoverPhoto(req, coverPhoto) {
        return await this.usersService.updateCoverPhoto(req.user.id, coverPhoto, req.user.coverPhotoCloudinaryPublicId);
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.FindOneParams]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    common_1.Get('username/:username'),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUsername", null);
__decorate([
    common_1.Patch('profile-picture'),
    common_1.UseGuards(jwtAuthentication_guard_1.JwtAuthenticationGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('profilePicture', { dest: 'images' })),
    __param(0, common_1.Req()),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilePicture", null);
__decorate([
    common_1.Patch('cover-photo'),
    common_1.UseGuards(jwtAuthentication_guard_1.JwtAuthenticationGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('coverPhoto', { dest: 'images' })),
    __param(0, common_1.Req()),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCoverPhoto", null);
UsersController = __decorate([
    common_1.Controller('api/v1/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map