import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAuthenticationException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }

  public static wrongCredentialsGiven(): UserAuthenticationException {
    return new this(
      `The given credentials are incorrect`,
      HttpStatus.UNAUTHORIZED
    )
  }

  public static userDoesNotExist(username: string): UserAuthenticationException {
    return new this(
      `The user with username '${username}' does not exist in the database`,
      HttpStatus.CONFLICT
    )
  }
}
