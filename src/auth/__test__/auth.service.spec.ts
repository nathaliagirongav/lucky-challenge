import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@/user/dto/user.dto';
import { UserException } from '@/user/errors';
import { HttpStatus } from '@nestjs/common';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[auth][AuthService]', () => {
  const findOneMock = jest.fn();
  const validatePasswordMock = jest.fn();
  const signMock = jest.fn();

  const userService = {
    findOne: findOneMock,
    validatePassword: validatePasswordMock,
  } as any as UserService;

  const jwtService = {
    sign: signMock,
  } as any as JwtService;

  const authService = new AuthService(
    userService,
    jwtService
  );

  it('Validates user with correct username and password', async () => {
    findOneMock.mockReturnValueOnce({
      username: 'my-username',
      password: '1234'
    } as UserDto);

    validatePasswordMock.mockReturnValueOnce(true);

    const user = await authService.validateUser('my-username', '1234');

    expect(userService.validatePassword).toHaveBeenLastCalledWith('1234', '1234');
    
    expect(user.username).toEqual('my-username');
    expect(user.password).toEqual('1234');
  });

  it('Throws exception when user does not exist', async () => {
    findOneMock.mockReturnValueOnce(null);

    try {
      await authService.validateUser('my-username', '1234');
    } catch (e) {
      expect(e).toBeInstanceOf(UserException);
      expect(e.message).toEqual(
        `The user with username 'my-username' does not exist in the database`,
      );
      expect(e.status).toEqual(HttpStatus.CONFLICT);
    }
  });

  it('Return null when credentials are incorrect', async () => {
    findOneMock.mockReturnValueOnce({
      username: 'my-username',
      password: '1234'
    } as UserDto);

    validatePasswordMock.mockReturnValueOnce(false);

    const response = await authService.validateUser('my-username', '12345');

    expect(userService.validatePassword).toHaveBeenLastCalledWith('12345', '1234');
    
    expect(response).toBeNull();    
  });
});
