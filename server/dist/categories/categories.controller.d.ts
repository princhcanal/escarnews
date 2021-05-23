import CategoriesService from './categories.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { FindOneParams } from '../utils/findOneParams';
export default class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<import("./category.entity").Category[]>;
    getCategoryById({ id }: FindOneParams): Promise<import("./category.entity").Category>;
    createCategory(category: CreateCategoryDTO): Promise<import("./category.entity").Category>;
    updateCategory({ id }: FindOneParams, category: UpdateCategoryDTO): Promise<import("./category.entity").Category>;
    deleteCategory({ id }: FindOneParams): Promise<void>;
}
