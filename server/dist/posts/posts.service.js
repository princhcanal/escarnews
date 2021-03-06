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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloudinary_1 = require("cloudinary");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("../users/user.entity");
const postNotFound_exception_1 = require("./exception/postNotFound.exception");
const deleteFile_1 = require("../utils/deleteFile");
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async getAllPosts() {
        return await this.postsRepository.find({
            relations: ['author'],
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async getPostsByUserId(userId) {
        return await this.postsRepository.find({
            where: {
                author: {
                    id: userId,
                },
            },
        });
    }
    async getPostsByUsername(username) {
        return await this.postsRepository
            .createQueryBuilder('posts')
            .innerJoinAndSelect('posts.author', 'author')
            .where('author.username = :username', { username: username })
            .orderBy('posts.createdAt', 'DESC')
            .getMany();
    }
    async getPostById(id) {
        const post = await this.postsRepository.findOne(id, {
            relations: ['author'],
        });
        if (post) {
            return post;
        }
        throw new postNotFound_exception_1.PostNotFoundException(id);
    }
    async createPost(post, author, file) {
        let imageUrl;
        let cloudinaryPublicId;
        if (file) {
            const { secure_url, public_id } = await cloudinary_1.v2.uploader.upload(file.path);
            imageUrl = secure_url;
            cloudinaryPublicId = public_id;
            deleteFile_1.deleteFile(file.path);
        }
        const newPost = this.postsRepository.create({
            ...post,
            author,
            imageUrl,
            cloudinaryPublicId,
        });
        await this.postsRepository.save(newPost);
        return newPost;
    }
    async updatePost(id, post) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOne(id, {
            relations: ['author'],
        });
        if (updatedPost) {
            return updatedPost;
        }
        throw new postNotFound_exception_1.PostNotFoundException(id);
    }
    async deletePost(id) {
        const post = await this.postsRepository.findOne(id);
        if (post.cloudinaryPublicId) {
            cloudinary_1.v2.uploader.destroy(post.cloudinaryPublicId);
        }
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new postNotFound_exception_1.PostNotFoundException(id);
        }
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map