// import from NestJS framework
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
// import from NodeJS environment
import { join } from 'path';
// import from application files
import { AppModule } from './app.module';
/* eslint-disable prettier/prettier */
async function bootstrap()
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix: '/public'});
  app.enableCors
  ({
    origin: 'http://localhost:4200',
    methods: 'DELETE, GET, HEAD, PATCH, POST, PUT',
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();