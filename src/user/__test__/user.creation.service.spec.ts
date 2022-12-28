import { DataSource, QueryRunner } from 'typeorm';
import { UserService } from '@/user/user.service';
import { LocationService } from '@/location/location.service';
import { UserCreationService } from '@/user/user.creation.service';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserCreationException } from '@/user/errors';
import { HttpStatus } from '@nestjs/common';
import { CityDto } from '@/location/dto/city.dto';

beforeEach(() => {
  jest.resetAllMocks();
});


describe('[user][UserCreationService]', () => {
  const createQueryRunnerMock = jest.fn();
  const startTransactionMock = jest.fn();
  const commitTransactionMock = jest.fn();
  const rollbackTransactionMock = jest.fn();
  const findOneMock = jest.fn();
  const createUserMock = jest.fn();
  const createUserProfileMock = jest.fn();
  const getUserDataMock = jest.fn();
  const findCityMock = jest.fn();
  const createAddressMock = jest.fn();

  const dataSourceMock = {
    createQueryRunner: createQueryRunnerMock,
  } as any as DataSource;

  const queryRunnerMock = {
    startTransaction: startTransactionMock,
    commitTransaction: commitTransactionMock,
    rollbackTransaction: rollbackTransactionMock, 
  } as any as QueryRunner;

  createQueryRunnerMock.mockReturnValue(queryRunnerMock);

  const userService = {
    findOne: findOneMock,
    createUser: createUserMock,
    createUserProfile: createUserProfileMock,
    getUserData: getUserDataMock,
  } as any as UserService;

  const locationService = {
    findCity: findCityMock,
    createAddress: createAddressMock,
  } as any as LocationService;

  const userCreationService = new UserCreationService(
    dataSourceMock,
    userService,
    locationService
  );

  const userToBeCreated = {
    username: 'my-username',
    password: 'my-password',
    name: 'my name',
    address: 'calle 57',
    cityId: 3,
  } as UserCreateDto;

  it('Creates a user successfully', async () => {
    findOneMock.mockResolvedValueOnce(null);
    findCityMock.mockResolvedValueOnce({
      id: 3,
      countryId: 1,
      name: 'Armenia'
    } as CityDto);
    createUserMock.mockResolvedValueOnce(2);
    createAddressMock.mockResolvedValueOnce(4);
    createUserProfileMock.mockResolvedValueOnce(3);
    getUserDataMock.mockResolvedValueOnce({
      id: 2,
      name: 'my name',
      address: {
        street: 'calle 57',
        city: 'Armenia',
        country: 'Colombia',
      }
    });

    const response = await userCreationService.create(userToBeCreated);

    expect(createUserProfileMock).toHaveBeenCalledWith(2, 4, 'my name');
    expect(startTransactionMock).toHaveBeenCalledTimes(1);
    expect(commitTransactionMock).toHaveBeenCalledTimes(1);
    expect(rollbackTransactionMock).not.toHaveBeenCalled();
    expect(response).toMatchObject({
      id: 2,
      name: 'my name',
      address: {
        street: 'calle 57',
        city: 'Armenia',
        country: 'Colombia',
      }
    });
  });

  it('Throws exception when there is an error in creation process', async () => {
    findOneMock.mockResolvedValueOnce(null);
    findCityMock.mockResolvedValueOnce({
      id: 3,
      countryId: 1,
      name: 'Armenia'
    } as CityDto);
    createUserMock.mockResolvedValueOnce(2);
    createAddressMock.mockResolvedValueOnce(4);
    createUserProfileMock.mockRejectedValue({message: 'random error'});

    try {
      await userCreationService.create(userToBeCreated);
    } catch (e) {
      expect(createUserProfileMock).toHaveBeenCalledWith(2, 4, 'my name');
      expect(startTransactionMock).toHaveBeenCalledTimes(1);
      expect(commitTransactionMock).not.toHaveBeenCalled();
      expect(rollbackTransactionMock).toHaveBeenCalledTimes(1);
      expect(e).toBeInstanceOf(UserCreationException);
      expect(e.message).toEqual(
        `The user 'my-username' could not be created because of the following error: random error`,
      );
      expect(e.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('Throws exception if the user already exists', async () => {
    findOneMock.mockResolvedValueOnce({
      id: 1,
      username: 'my-username',
      password: 'my-password',
    });

    try {
      await userCreationService.create(userToBeCreated);
    } catch (e) {
      expect(e).toBeInstanceOf(UserCreationException);
      expect(e.message).toEqual(
        `Username 'my-username' already exists`
      );
      expect(e.status).toEqual(HttpStatus.CONFLICT);
    }

    expect(startTransactionMock).not.toHaveBeenCalled();
    expect(commitTransactionMock).not.toHaveBeenCalled();
  });

  it('Throws exception if the city does not exist', async () => {
    findOneMock.mockResolvedValueOnce(null);
    findCityMock.mockResolvedValueOnce(null);

    try {
      await userCreationService.create(userToBeCreated);
    } catch (e) {
      expect(e).toBeInstanceOf(UserCreationException);
      expect(e.message).toEqual(
        `The city with id '3' does not exist in the database`,
      );
      expect(e.status).toEqual(HttpStatus.CONFLICT);
    }

    expect(startTransactionMock).not.toHaveBeenCalled();
    expect(commitTransactionMock).not.toHaveBeenCalled();
  });
});
