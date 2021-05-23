import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { CategoryNotFoundException } from './exceptions/categoryNotFound.exception';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  public async getAllCategories() {
    return await this.categoriesRepository.find({ relations: ['posts'] });
  }

  public async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['posts'],
    });

    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  public async createCategory(category: CreateCategoryDTO) {
    const newCategory = this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  public async updateCategory(id: number, category: UpdateCategoryDTO) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne(id, {
      relations: ['posts'],
    });

    if (updatedCategory) {
      return updatedCategory;
    }

    throw new CategoryNotFoundException(id);
  }

  public async deleteCategory(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }
}
