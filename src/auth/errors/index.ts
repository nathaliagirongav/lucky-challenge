import { CustomException } from '@/errors/custom.exception';
import { HttpStatus } from '@nestjs/common';

export class UserAuthenticationException extends CustomException {

  public static wrongCredentialsGiven(): UserAuthenticationException {
    return new this(
      `The given credentials are incorrect`,
      HttpStatus.UNAUTHORIZED
    )
  }
}
