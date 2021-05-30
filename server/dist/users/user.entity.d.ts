import { Post } from 'src/posts/post.entity';
export declare class User {
    id?: number;
    email: string;
    username: string;
    password: string;
    profilePictureUrl: string;
    profilePictureCloudinaryPublicId: string;
    coverPhotoUrl: string;
    coverPhotoCloudinaryPublicId: string;
    posts: Post[];
}
