import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LogInDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDTO, res: Response): Promise<User>;
    login(loginData: LogInDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Response<any, Record<string, any>>;
    getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User>;
    private getCookieWithJwtToken;
    private getCookieForLogOut;
    private verifyPassword;
}
