import { CustomException } from '@/errors/custom.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';


@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    

    if (exception instanceof CustomException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.getResponse(),
      });

      return;
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(
        exception.getResponse(),
      );

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      url: request.url,
    });
  }
}
