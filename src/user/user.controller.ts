import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserCreationService } from '@/user/user.creation.service';
import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { UserService } from '@/user/user.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private userCreationService: UserCreationService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('create')
  public async create(@Body() dto: UserCreateDto): Promise<any> {
    return this.userCreationService.create(dto);
  } 

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req): Promise<Record<string, string>> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Request() req) {
    return this.userService.getUserData(req.user.username);
  }
}
