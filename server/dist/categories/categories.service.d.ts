import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
export default class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    createCategory(category: CreateCategoryDTO): Promise<Category>;
    updateCategory(id: number, category: UpdateCategoryDTO): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
