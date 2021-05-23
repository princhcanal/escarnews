import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let origin = 'http://localhost:3000';
  if (process.env.NODE_ENV === 'production') {
    origin = 'http://escarnews.herokuapp.com';
  }
  app.enableCors({ origin, credentials: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
