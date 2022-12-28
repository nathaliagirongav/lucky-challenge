import { DataSource, QueryRunner } from 'typeorm';
import { ProfileService } from '@/profile/profile.service';
import { UserProfileDto } from '@/profile/dto/user.profile.dto';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[profile][ProfileService]', () => {
  const createQueryRunnerMock = jest.fn();
  const queryMock = jest.fn();

  const dataSourceMock = {
    createQueryRunner: createQueryRunnerMock,
  } as any as DataSource;

  const queryRunnerMock = {
    query: queryMock,
  } as any as QueryRunner;

  createQueryRunnerMock.mockReturnValue(queryRunnerMock);

  const profileService = new ProfileService(dataSourceMock);

  it('Finds a user profile with a userId given', async () => {
    queryMock.mockResolvedValue([
      {
        userId: 12,
        addressId: 3,
        name: 'My name',
      }
    ]);

    const profile = await profileService.getProfile(12);

    expect(profile.userId).toEqual(12);
    expect(profile.addressId).toEqual(3);
    expect(profile.name).toEqual('My name');
    expect(profile).toBeInstanceOf(UserProfileDto);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Returns null when profile is not found on the DB', async () => {
    queryMock.mockResolvedValueOnce([]);

    const profile = await profileService.getProfile(12);
    
    expect(profile).toBeNull();
    expect(queryMock).toHaveBeenCalledTimes(1);
  });
});
