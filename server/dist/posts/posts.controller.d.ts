/// <reference types="multer" />
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { FindOneParams } from 'src/utils/findOneParams';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): Promise<import("./post.entity").Post[]>;
    getPostById({ id }: FindOneParams): Promise<import("./post.entity").Post>;
    getPostsByUserId(userId: string): Promise<import("./post.entity").Post[]>;
    createPost(post: CreatePostDTO, req: RequestWithUser, image: Express.Multer.File): Promise<import("./post.entity").Post>;
    updatePost(id: string, post: UpdatePostDTO): Promise<import("./post.entity").Post>;
    deletePost(id: string): Promise<void>;
}
