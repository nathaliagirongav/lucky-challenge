import { HttpException, HttpStatus } from '@nestjs/common';

export class UserCreationException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }

  public static userAlreadyExists(username: string): UserCreationException {
    return new this(
      `User with username: ${username} already exists`,
      HttpStatus.CONFLICT
    );
  }

  public static cityDoesNotExist(cityId: number): UserCreationException {
    return new this(
      `The city with id ${cityId} does not exist in the database`,
      HttpStatus.CONFLICT
    )
  }

  public static unableToCreateUser(username: string, message: string): UserCreationException {
    return new this(
      `The user ${username} could not be created because of the following error: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}
