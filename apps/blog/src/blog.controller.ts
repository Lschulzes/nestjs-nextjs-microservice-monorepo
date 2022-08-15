import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getHello(): string {
    return this.blogService.getHello();
  }
}
