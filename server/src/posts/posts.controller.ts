import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { JwtAuthenticationGuard } from 'src/authentication/jwtAuthentication.guard';
import { FindOneParams } from 'src/utils/findOneParams';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image', { dest: 'images' }))
  public async createPost(
    @Body() post: CreatePostDTO,
    @Req() req: RequestWithUser,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.postsService.createPost(post, req.user, image);
  }

  @Patch(':id')
  public async updatePost(
    @Param('id') id: string,
    @Body() post: UpdatePostDTO,
  ) {
    return await this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(Number(id));
  }
}
