import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

describe('BlogController', () => {
  let blogController: BlogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();

    blogController = app.get<BlogController>(BlogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(blogController.getHello()).toBe('Hello World!');
    });
  });
});
