import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';
import { UserProfileDto } from '@/user/dto/user.profile.dto';

export class UserDto {
  constructor(object: Partial<UserDto>) {
    Object.assign(this, { ...object });
  }

  @IsOptional() @IsNumber() public id: number;

  @IsNotEmpty() @IsString() public username: string;

  @IsNotEmpty() @IsString() public password: string;

  @IsOptional() @IsObject() public profile: UserProfileDto;
}
