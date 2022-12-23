import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileTable1671732079454 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId int,
        addressId int,
        name varchar(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,

        FOREIGN KEY (userId)
        REFERENCES user(id)
        ON DELETE CASCADE,
        
        FOREIGN KEY (addressId)
        REFERENCES address(id)
        ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE profile');
  }
}
