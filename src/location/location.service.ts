import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { CityDto } from '@/location/dto/city.dto';

@Injectable()
export class LocationService {
  private queryRunner: QueryRunner;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: DataSource,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  public async findCity(cityId: number): Promise<CityDto | null> {
    const result = await this.queryRunner.query(
      `SELECT * FROM city WHERE id = ${cityId};`
    );

    return result.length > 0 ? new CityDto(result[0]) : null;
  } 

  public async createAddress(cityId: number, street: string): Promise<number> {
    const createdAddress = await this.queryRunner.query(
      `INSERT INTO address(cityId, street) VALUES (${cityId}, '${street}');`
    );
    
    return createdAddress.insertId;
  }
}
