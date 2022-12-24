import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { UserDto } from '@/user/dto/user.dto';
import { LocationService } from '@/location/location.service';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword: string = await this.hash(password);

    const createdUser = await this.queryRunner.query(
      `INSERT INTO user(username, password) VALUES ('${username}', '${hashedPassword}');`
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

  private async hash(text: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);

    return bcrypt.hash(text, salt);
  }
}
