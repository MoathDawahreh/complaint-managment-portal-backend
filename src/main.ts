import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //setting whitelist to true will prevent reciving other fields in the body that are not created in the dto
    }),
  ); // To apply validation pipe to all requests
  await app.listen(3000);
}
bootstrap();
