import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/application/app.module';
import { HttpExceptionHandler } from '@/errors/http-exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    })
  );

  app.useGlobalFilters(new HttpExceptionHandler());

  await app.listen(3000);
}
bootstrap();
