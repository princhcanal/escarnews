/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { User } from 'src/users/user.entity';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    getAllPosts(): Promise<Post[]>;
    getPostsByUserId(userId: number): Promise<Post[]>;
    getPostById(id: number): Promise<Post>;
    createPost(post: CreatePostDTO, author: User, file: Express.Multer.File): Promise<Post>;
    updatePost(id: number, post: UpdatePostDTO): Promise<Post>;
    deletePost(id: number): Promise<void>;
}
