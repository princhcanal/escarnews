import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { User } from 'src/users/user.entity';
import { PostNotFoundException } from './exception/postNotFound.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  public async getAllPosts() {
    return await this.postsRepository.find({ relations: ['author'] });
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

  public async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });

    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  public async createPost(post: CreatePostDTO, author: User) {
    const newPost = this.postsRepository.create({ ...post, author });
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
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
