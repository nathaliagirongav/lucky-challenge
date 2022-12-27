import { CustomException } from '@/errors/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class UserCreationException extends CustomException {
  public static userAlreadyExists(username: string): UserCreationException {
    return new this(
      `Username '${username}' already exists`,
      HttpStatus.CONFLICT
    );
  }

  public static cityDoesNotExist(cityId: number): UserCreationException {
    return new this(
      `The city with id '${cityId}' does not exist in the database`,
      HttpStatus.CONFLICT
    )
  }

  public static unableToCreateUser(username: string, message: string): UserCreationException {
    return new this(
      `The user '${username}' could not be created because of the following error: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export class UserException extends CustomException {
  public static userDoesNotExist(username: string): UserException {
    return new this(
      `The user with username '${username}' does not exist in the database`,
      HttpStatus.CONFLICT
    )
  }
}
