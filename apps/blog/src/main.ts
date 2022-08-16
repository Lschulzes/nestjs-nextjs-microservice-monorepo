import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { BlogModule } from './blog.module';

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);

  app.use(cookieParser(process.env.JWT_KEY!));

  await app.listen(3000);
}
bootstrap();
