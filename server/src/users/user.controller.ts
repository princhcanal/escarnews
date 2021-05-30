import {
  Get,
  Controller,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneParams } from '../utils/findOneParams';
import { JwtAuthenticationGuard } from 'src/authentication/jwtAuthentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  public async getUserById(@Param() { id }: FindOneParams) {
    return await this.usersService.getById(Number(id));
  }

  @Get('username/:username')
  public async getUserByUsername(@Param('username') username: string) {
    return await this.usersService.getByUsername(username);
  }

  @Patch('profile-picture')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('profilePicture', { dest: 'images' }))
  public async updateProfilePicture(
    @Req() req: RequestWithUser,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return await this.usersService.updateProfilePicture(
      req.user.id,
      profilePicture,
      req.user.profilePictureCloudinaryPublicId,
    );
  }

  @Patch('cover-photo')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('coverPhoto', { dest: 'images' }))
  public async updateCoverPhoto(
    @Req() req: RequestWithUser,
    @UploadedFile() coverPhoto: Express.Multer.File,
  ) {
    return await this.usersService.updateCoverPhoto(
      req.user.id,
      coverPhoto,
      req.user.coverPhotoCloudinaryPublicId,
    );
  }
}
