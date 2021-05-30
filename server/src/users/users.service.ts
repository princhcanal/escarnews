import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from 'src/utils/deleteFile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async create(userData: CreateUserDTO) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async updateProfilePicture(
    id: number,
    file: Express.Multer.File,
    previousProfilePictureCloudinaryPublicId: string,
  ) {
    let profilePictureUrl: string;
    let profilePictureCloudinaryPublicId: string;

    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
      );

      if (previousProfilePictureCloudinaryPublicId) {
        cloudinary.uploader.destroy(previousProfilePictureCloudinaryPublicId);
      }

      profilePictureUrl = secure_url;
      profilePictureCloudinaryPublicId = public_id;
      deleteFile(file.path);
    }

    await this.usersRepository.update(id, {
      profilePictureUrl,
      profilePictureCloudinaryPublicId,
    });
  }

  public async updateCoverPhoto(
    id: number,
    file: Express.Multer.File,
    previousCoverPhotoCloudinaryPublicId: string,
  ) {
    let coverPhotoUrl: string;
    let coverPhotoCloudinaryPublicId: string;

    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
      );

      if (previousCoverPhotoCloudinaryPublicId) {
        cloudinary.uploader.destroy(previousCoverPhotoCloudinaryPublicId);
      }

      coverPhotoUrl = secure_url;
      coverPhotoCloudinaryPublicId = public_id;
      deleteFile(file.path);
    }

    await this.usersRepository.update(id, {
      coverPhotoUrl,
      coverPhotoCloudinaryPublicId,
    });
  }
}
