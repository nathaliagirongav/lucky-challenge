import { IsString } from 'class-validator';

export class AddressDto {
  constructor(object: Partial<AddressDto>) {
    Object.assign(this, { ...object });
  }

  @IsString() public street: string;

  @IsString() public city: string;

  @IsString() public country: string;
}
