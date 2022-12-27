import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserProfileDto {
  constructor(object: Partial<UserProfileDto>) {
    Object.assign(this, { ...object });
  }

  @IsNotEmpty() @IsNumber() public userId: number;

  @IsNotEmpty() @IsNumber() public addressId: number;

  @IsNotEmpty() @IsString() public name: string;
}
