import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Auth } from '@app/common/guards/auth.guard';
import { UserPayload } from '@app/common/middlewares/current-user.middleware';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(Auth)
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
