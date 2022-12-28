import { DataSource, QueryRunner } from 'typeorm';
import { LocationService } from '@/location/location.service';
import { CityDto } from '@/location/dto/city.dto';
import { AddressDto } from '@/location/dto/address.dto';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[location][LocationService]', () => {
  const createQueryRunnerMock = jest.fn();
  const queryMock = jest.fn();

  const dataSourceMock = {
    createQueryRunner: createQueryRunnerMock,
  } as any as DataSource;

  const queryRunnerMock = {
    query: queryMock,
  } as any as QueryRunner;

  createQueryRunnerMock.mockReturnValue(queryRunnerMock);

  const locationService = new LocationService(dataSourceMock);
  
  it('Finds a city with a cityId given', async () => {
    queryMock.mockResolvedValue([
      {
        id: 7,
        countryId: 21,
        name: 'Armenia',
      }
    ]);

    const city = await locationService.findCity(7);

    expect(city.id).toEqual(7);
    expect(city.countryId).toEqual(21);
    expect(city.name).toEqual('Armenia');
    expect(city).toBeInstanceOf(CityDto);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Returns null when city is not found on the DB', async () => {
    queryMock.mockResolvedValue([]);

    const city = await locationService.findCity(7);

    expect(city).toBeNull();
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Creates an address', async () => {
    queryMock.mockResolvedValueOnce({
      insertId: 24,
    });

    const result = await locationService.createAddress(1, 'Calle 57N');

    expect(result).toEqual(24);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('Get an address with an addressId given', async () => {
    queryMock.mockResolvedValue([
      {
        street: 'Calle 57N',
        city: 'Armenia',
        country: 'Colombia',
      }
    ]);

    const address = await locationService.getAddress(16);

    expect(address.street).toEqual('Calle 57N');
    expect(address.city).toEqual('Armenia');
    expect(address.country).toEqual('Colombia');
    expect(address).toBeInstanceOf(AddressDto);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });
});
