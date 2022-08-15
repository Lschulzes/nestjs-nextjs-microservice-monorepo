import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog.module';

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);
  await app.listen(3000);
}
bootstrap();
