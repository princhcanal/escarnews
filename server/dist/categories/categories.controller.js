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
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const createCategory_dto_1 = require("./dto/createCategory.dto");
const updateCategory_dto_1 = require("./dto/updateCategory.dto");
const jwtAuthentication_guard_1 = require("../authentication/jwtAuthentication.guard");
const findOneParams_1 = require("../utils/findOneParams");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }
    async getCategoryById({ id }) {
        return await this.categoriesService.getCategoryById(Number(id));
    }
    async createCategory(category) {
        return await this.categoriesService.createCategory(category);
    }
    async updateCategory({ id }, category) {
        return await this.categoriesService.updateCategory(Number(id), category);
    }
    async deleteCategory({ id }) {
        return await this.categoriesService.deleteCategory(Number(id));
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.FindOneParams]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryById", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwtAuthentication_guard_1.JwtAuthenticationGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCategory_dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwtAuthentication_guard_1.JwtAuthenticationGuard),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.FindOneParams,
        updateCategory_dto_1.UpdateCategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwtAuthentication_guard_1.JwtAuthenticationGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findOneParams_1.FindOneParams]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
CategoriesController = __decorate([
    common_1.Controller('api/v1/categories'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [categories_service_1.default])
], CategoriesController);
exports.default = CategoriesController;
//# sourceMappingURL=categories.controller.js.map