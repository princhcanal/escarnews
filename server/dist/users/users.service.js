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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const cloudinary_1 = require("cloudinary");
const deleteFile_1 = require("../utils/deleteFile");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getByEmail(email) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this email does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getById(id) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getByUsername(username) {
        const user = await this.usersRepository.findOne({ username });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this username does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async create(userData) {
        const newUser = this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }
    async updateProfilePicture(id, file, previousProfilePictureCloudinaryPublicId) {
        let profilePictureUrl;
        let profilePictureCloudinaryPublicId;
        if (file) {
            const { secure_url, public_id } = await cloudinary_1.v2.uploader.upload(file.path);
            if (previousProfilePictureCloudinaryPublicId) {
                cloudinary_1.v2.uploader.destroy(previousProfilePictureCloudinaryPublicId);
            }
            profilePictureUrl = secure_url;
            profilePictureCloudinaryPublicId = public_id;
            deleteFile_1.deleteFile(file.path);
        }
        await this.usersRepository.update(id, {
            profilePictureUrl,
            profilePictureCloudinaryPublicId,
        });
    }
    async updateCoverPhoto(id, file, previousCoverPhotoCloudinaryPublicId) {
        let coverPhotoUrl;
        let coverPhotoCloudinaryPublicId;
        if (file) {
            const { secure_url, public_id } = await cloudinary_1.v2.uploader.upload(file.path);
            if (previousCoverPhotoCloudinaryPublicId) {
                cloudinary_1.v2.uploader.destroy(previousCoverPhotoCloudinaryPublicId);
            }
            coverPhotoUrl = secure_url;
            coverPhotoCloudinaryPublicId = public_id;
            deleteFile_1.deleteFile(file.path);
        }
        await this.usersRepository.update(id, {
            coverPhotoUrl,
            coverPhotoCloudinaryPublicId,
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map