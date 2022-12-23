import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { UserDto } from '@/user/dto/user.dto';
import { LocationService } from '@/location/location.service';

@Injectable()
export class UserService {
  private queryRunner: QueryRunner;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: DataSource,
    private readonly locationService: LocationService,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  public async findOne(username: string): Promise<UserDto | null> {
    const result = await this.queryRunner.query(
      `SELECT * FROM user WHERE username = '${username}';`
    );

    return result.length > 0 ? new UserDto(result[0]) : null;
  }

  public async createUser(
    username: string,
    password: string
  ): Promise<number> {
    // TODO password with Encryption or Hashing
    const createdUser = await this.queryRunner.query(
      `INSERT INTO user(username, password) VALUES ('${username}', '${password}');`
    );

    return createdUser.insertId;
  }

  public async createUserProfile(
    userId: number,
    addressId: number,
    name: string
  ): Promise<number> {
    const createdProfile = await this.queryRunner.query(
      `INSERT INTO profile(userId, addressId, name) VALUES (${userId}, ${addressId}, '${name}');`
    );

    return createdProfile.insertId;
  }
}
