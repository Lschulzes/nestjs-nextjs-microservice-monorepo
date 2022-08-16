import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @MessagePattern('getHello')
  getHello(name: string): string {
    return this.blogService.getHello(name);
  }
}
