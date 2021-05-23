import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    create(userData: CreateUserDTO): Promise<User>;
}
