import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
