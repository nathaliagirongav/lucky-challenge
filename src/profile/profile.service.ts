import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { UserProfileDto } from '@/profile/dto/user.profile.dto';

@Injectable()
export class ProfileService {
  private queryRunner: QueryRunner;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: DataSource,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  public async getProfile(userId: number): Promise<UserProfileDto | null> {
    const result = await this.queryRunner.query(
      `SELECT * FROM profile WHERE userId = ${userId} ORDER BY created_at desc;`
    );

    return result.length > 0 ? new UserProfileDto(result[0]) : null;
  }
}
