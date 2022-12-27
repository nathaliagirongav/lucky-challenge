import { UserDto } from '@/user/dto/user.dto';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '@/user/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  public async validateUser(username: string, passsword: string): Promise<UserDto | null> {
    const user = await this.usersService.findOne(username);

    if (!user) throw UserException.userDoesNotExist(username);
    

    if (user && await this.usersService.validatePassword(passsword, user.password)) {
      return user;
    }

    return null;
  }

  public async login(user: UserDto): Promise<Record<string, string>> {
    const payload = {username: user.username, sub: user.id};

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
