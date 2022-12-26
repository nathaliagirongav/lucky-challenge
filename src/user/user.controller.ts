import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserCreationService } from '@/user/user.creation.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private userCreationService: UserCreationService,
    private authService: AuthService,
  ) {}

  @Post('create')
  public async create(@Body() dto: UserCreateDto): Promise<any> {
    await this.userCreationService.create(dto);
    // TODO response
  } 

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req): Promise<Record<string, string>> {
    return this.authService.login(req.user);
  }
}
