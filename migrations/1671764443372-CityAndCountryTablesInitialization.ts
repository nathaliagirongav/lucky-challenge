import { MigrationInterface, QueryRunner } from 'typeorm';

export class CityAndCountryTablesInitialization1671764443372 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO country(name)
      VALUES('Colombia'), ('Argentina'), ('Chile'), ('Venezuela');
    `);

    await queryRunner.query(`
      INSERT INTO city(countryId, name)
      VALUES(1, 'Popayan'), (1, 'Bogota'), (2, 'Buenos Aires'), (4, 'Caracas');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE country');
    await queryRunner.query('TRUNCATE city');
  }
}
