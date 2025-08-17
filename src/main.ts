import 'reflect-metadata'; // must be first

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // makes sure that the data has proper types and matches what is defined in the dto file
      whitelist: true, // remove any incoming data which is not defined the dto file from the payload coming from the client
      forbidNonWhitelisted: true, // if enabled nest will throw an error for non whitelisted data coming from the payload
      skipMissingProperties: false, // if enabled nest will not throw an error if a property is missing in the payload
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
