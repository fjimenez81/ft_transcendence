import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Ft_transcendence')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(3000);
  logger.log("Server listen on: http://localhost:3000")
}
bootstrap();
