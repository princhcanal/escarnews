import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    categories: Category[];
    author: User;
}
