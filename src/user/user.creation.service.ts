import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { LocationService } from '@/location/location.service';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserCreationException } from '@/errors';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class UserCreationService {
  private queryRunner: QueryRunner;

  constructor(
    @Inject('DATABASE_CONNECTION')
    private connection: DataSource,
    private readonly userService: UserService,
    private readonly locationService: LocationService,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  public async create(user: UserCreateDto) {
    if (await this.userService.findOne(user.username)) {
      throw UserCreationException.userAlreadyExists(user.username);
    } 

    if (! await this.locationService.findCity(user.cityId)) {
      throw UserCreationException.cityDoesNotExist(user.cityId);
    }

    try {
      this.queryRunner.startTransaction();
      const userId: number = await this.userService.createUser(user.username, user.password);
      const addressId: number = await this.locationService.createAddress(user.cityId, user.address);

      await this.userService.createUserProfile(userId, addressId, user.name)

      this.queryRunner.commitTransaction();
    } catch (error) {
      this.queryRunner.rollbackTransaction();

      throw UserCreationException.unableToCreateUser(user.username, error.message);
    } 
  }
}
