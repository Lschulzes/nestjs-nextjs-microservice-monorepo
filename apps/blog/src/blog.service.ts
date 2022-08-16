import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  getHello(name: string): string {
    return `Hello ${name}!`;
  }
}
