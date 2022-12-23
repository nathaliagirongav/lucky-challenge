import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CityDto {
  constructor(object: Partial<CityDto>) {
    Object.assign(this, { ...object });
  }

  @IsNotEmpty() @IsNumber() public id: number;

  @IsNotEmpty() @IsNumber() public countryId: number;

  @IsNotEmpty() @IsString() public name: string;
}
