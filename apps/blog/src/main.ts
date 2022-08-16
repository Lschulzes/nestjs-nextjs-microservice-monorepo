import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const logger = new Logger('Blog');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BlogModule, {
    transport: Transport.TCP,
    options: {
      port: 3000,
    },
  });

  await app.listen();
  logger.log('Microservice is listening');
}
bootstrap();
