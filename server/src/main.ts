import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

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

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
