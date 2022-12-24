import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserCreationService } from '@/user/user.creation.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private userCreationService: UserCreationService
  ) {}

  @Post('create')
  public async create(@Body() dto: UserCreateDto): Promise<any> {
    await this.userCreationService.create(dto);
    // TODO response
  } 
}
