import { Post } from 'src/posts/post.entity';
export declare class User {
    id?: number;
    email: string;
    username: string;
    password: string;
    posts: Post[];
}
