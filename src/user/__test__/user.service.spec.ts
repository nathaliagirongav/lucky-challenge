import { LocationService } from '@/location/location.service';
import { ProfileService } from '@/profile/profile.service';
import { DataSource, QueryRunner } from 'typeorm';
import { UserService } from '@/user/user.service';
import { UserDto } from '@/user/dto/user.dto';
import { UserException } from '@/user/errors';
import { HttpStatus } from '@nestjs/common';
import { AddressDto } from '@/location/dto/address.dto';
import { UserProfileDto } from '@/profile/dto/user.profile.dto';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[user][UserService]', () => {
  const createQueryRunnerMock = jest.fn();
  const queryMock = jest.fn();
  const getProfileMock = jest.fn();
  const getAddressMock = jest.fn();

  const dataSourceMock = {
    createQueryRunner: createQueryRunnerMock,
  } as any as DataSource;

  const queryRunnerMock = {
    query: queryMock,
  } as any as QueryRunner;

  createQueryRunnerMock.mockReturnValue(queryRunnerMock);

  const profileService = {
    getProfile: getProfileMock
  } as any as ProfileService;

  const locationService = {
    getAddress: getAddressMock
  } as any as LocationService;

  const userService = new UserService(
    dataSourceMock,
    profileService,
    locationService
  );

  it('Finds a user with a username given', async () => {
    queryMock.mockResolvedValue([
      {
        id: 3,
        username: 'my-username',
        password: 'random-password',
      }
    ]);

    const user = await userService.findOne('my-username');

    expect(user.id).toEqual(3);
    expect(user.username).toEqual('my-username');
    expect(user.password).toEqual('random-password');
    expect(user).toBeInstanceOf(UserDto);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Returns null when user is not found on the DB', async () => {
    queryMock.mockResolvedValue([]);

    const user = await userService.findOne('my-username');

    expect(user).toBeNull();
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Creates a user', async () => {
    queryMock.mockResolvedValueOnce({
      insertId: 13,
    });

    const result = await userService.createUser('my-username', 'random-password');

    expect(result).toEqual(13);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Creates a user profile', async () => {
    queryMock.mockResolvedValueOnce({
      insertId: 21,
    });

    const result = await userService.createUserProfile(13, 6, 'my-name');

    expect(result).toEqual(21);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Gets user data', async () => {
    queryMock.mockResolvedValue([
      {
        id: 3,
        username: 'my-username',
        password: 'random-password',
      }
    ]);

    getProfileMock.mockResolvedValue({
      userId: 3,
      addressId: 5,
      name: 'my-name',
    } as UserProfileDto);

    getAddressMock.mockResolvedValue({
      street: 'calle 57',
      city: 'Armenia',
      country: 'Colombia'
    } as AddressDto);
 
    const result = await userService.getUserData('my-username');

    expect(result).toMatchObject({
      id: 3,
      name: 'my-name',
      address: {
        street: 'calle 57',
        city: 'Armenia',
        country: 'Colombia',
      }
    });

    expect(getProfileMock).toHaveBeenCalledWith(3);
    expect(getAddressMock).toHaveBeenCalledWith(5);
  });

  it('Throws exception if the user does not exist when trying to get user data', async () => {
    queryMock.mockResolvedValue([]);

    try {
      await userService.getUserData('my-username');
    } catch (e) {
      expect(e).toBeInstanceOf(UserException);
      expect(e.message).toEqual(
        `The user with username 'my-username' does not exist in the database`
      );
      expect(e.status).toEqual(HttpStatus.CONFLICT);
    }
  });
});
