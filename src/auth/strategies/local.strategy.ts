import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@/auth/auth.service';
import { UserAuthenticationException } from '@/auth/errors';
import { UserDto } from '@/user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);

    if(!user) {
      throw UserAuthenticationException.wrongCredentialsGiven();
    }

    return user;
  }
}