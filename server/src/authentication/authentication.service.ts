import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { TokenPayload } from './tokenPayload.interface';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { LogInDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDTO, res: Response) {
    const { email, password } = registrationData;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      await this.login({ email, password }, res);

      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that username or email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(loginData: LogInDTO, res: Response) {
    const user = await this.getAuthenticatedUser(
      loginData.email,
      loginData.password,
    );

    const cookie = this.getCookieWithJwtToken(user);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  public logout(res: Response) {
    res.setHeader('Set-Cookie', this.getCookieForLogOut());
    const message = 'Logged out successfully';
    return res.send({ message });
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private getCookieWithJwtToken(user: User) {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return `Authorization=${token}; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  private getCookieForLogOut() {
    return `Authorization=; Path=/; Max-Age=0`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
