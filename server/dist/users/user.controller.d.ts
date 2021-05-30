/// <reference types="multer" />
import { UsersService } from './users.service';
import { FindOneParams } from '../utils/findOneParams';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserById({ id }: FindOneParams): Promise<import("./user.entity").User>;
    getUserByUsername(username: string): Promise<import("./user.entity").User>;
    updateProfilePicture(req: RequestWithUser, profilePicture: Express.Multer.File): Promise<void>;
    updateCoverPhoto(req: RequestWithUser, coverPhoto: Express.Multer.File): Promise<void>;
}
