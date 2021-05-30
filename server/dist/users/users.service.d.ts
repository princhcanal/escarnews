/// <reference types="multer" />
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    getByUsername(username: string): Promise<User>;
    create(userData: CreateUserDTO): Promise<User>;
    updateProfilePicture(id: number, file: Express.Multer.File, previousProfilePictureCloudinaryPublicId: string): Promise<void>;
    updateCoverPhoto(id: number, file: Express.Multer.File, previousCoverPhotoCloudinaryPublicId: string): Promise<void>;
}
