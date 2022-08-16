import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts/posts.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://blog-mongo-monorepo-srv:27017/blog'),
    PostsModule,
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class BlogModule {}
