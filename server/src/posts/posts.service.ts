import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { User } from 'src/users/user.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';
import { deleteFile } from 'src/utils/deleteFile';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  public async getAllPosts() {
    return await this.postsRepository.find({
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async getPostsByUserId(userId: number) {
    return await this.postsRepository.find({
      where: {
        author: {
          id: userId,
        },
      },
    });
  }

  public async getPostsByUsername(username: string) {
    return await this.postsRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.author', 'author')
      .where('author.username = :username', { username: username })
      .getMany();
  }

  public async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });

    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  public async createPost(
    post: CreatePostDTO,
    author: User,
    file: Express.Multer.File,
  ) {
    let imageUrl: string;
    let cloudinaryPublicId: string;

    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
      );
      imageUrl = secure_url;
      cloudinaryPublicId = public_id;
      deleteFile(file.path);
    }

    const newPost = this.postsRepository.create({
      ...post,
      author,
      imageUrl,
      cloudinaryPublicId,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  public async updatePost(id: number, post: UpdatePostDTO) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });

    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  public async deletePost(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (post.cloudinaryPublicId) {
      cloudinary.uploader.destroy(post.cloudinaryPublicId);
    }

    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
