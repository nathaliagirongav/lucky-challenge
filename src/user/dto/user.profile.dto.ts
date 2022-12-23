import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserProfileDto {
  @IsNotEmpty() @IsNumber() public userId: number;

  @IsNotEmpty() @IsNumber() public addressId: number;

  @IsNotEmpty() @IsString() public name: string;
}
