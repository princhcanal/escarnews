import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LogInDTO } from './dto/login.dto';
import { JwtAuthenticationGuard } from './jwtAuthentication.guard';

@Controller('api/v1/auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  public async register(
    @Body() registrationDTO: RegisterDTO,
    @Res() res: Response,
  ) {
    return await this.authenticationService.register(registrationDTO, res);
  }

  @HttpCode(200)
  @Post('login')
  public async logIn(@Body() loginDTO: LogInDTO, @Res() res: Response) {
    return await this.authenticationService.login(loginDTO, res);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  public async logOut(@Res() res: Response) {
    return this.authenticationService.logout(res);
  }
}
