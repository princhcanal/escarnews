import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';
import CategoriesService from './categories.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { JwtAuthenticationGuard } from '../authentication/jwtAuthentication.guard';
import { FindOneParams } from '../utils/findOneParams';

@Controller('api/v1/categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  public async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  public async getCategoryById(@Param() { id }: FindOneParams) {
    return await this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  public async createCategory(@Body() category: CreateCategoryDTO) {
    return await this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  public async updateCategory(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDTO,
  ) {
    return await this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  public async deleteCategory(@Param() { id }: FindOneParams) {
    return await this.categoriesService.deleteCategory(Number(id));
  }
}
