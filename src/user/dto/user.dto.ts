import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserProfileDto } from '@/user/dto/user.profile.dto';

export class UserDto {
  constructor(object: Partial<UserDto>) {
    Object.assign(this, { ...object });
  }

  @IsNotEmpty() @IsString() public username: string;

  @IsNotEmpty() @IsString() public password: string;

  @IsOptional() public profile: UserProfileDto;
}
