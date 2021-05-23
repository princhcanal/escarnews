import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LogInDTO } from './dto/login.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registrationDTO: RegisterDTO, res: Response): Promise<import("../users/user.entity").User>;
    logIn(loginDTO: LogInDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    logOut(res: Response): Promise<Response<any, Record<string, any>>>;
}
