import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
}
