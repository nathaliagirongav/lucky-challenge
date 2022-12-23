import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty() @IsString() public username: string;

  @IsNotEmpty() @IsString() public password: string;

  @IsNotEmpty() @IsString() public name: string;

  @IsNotEmpty() @IsString() public address: string;

  @IsNotEmpty() @IsNumber() public cityId: number;
}
