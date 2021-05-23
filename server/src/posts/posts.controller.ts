import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { JwtAuthenticationGuard } from 'src/authentication/jwtAuthentication.guard';
import { FindOneParams } from 'src/utils/findOneParams';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  public async getPostById(@Param() { id }: FindOneParams) {
    return await this.postsService.getPostById(Number(id));
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthenticationGuard)
  public async getPostsByUserId(@Param('id') userId: string) {
    return await this.postsService.getPostsByUserId(Number(userId));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  public async createPost(
    @Body() post: CreatePostDTO,
    @Req() req: RequestWithUser,
  ) {
    return this.postsService.createPost(post, req.user);
  }

  @Patch(':id')
  public async replacePost(
    @Param('id') id: string,
    @Body() post: UpdatePostDTO,
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
