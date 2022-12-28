import { AuthService } from '@/auth/auth.service';
import { UserDto } from '@/user/dto/user.dto';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { UserAuthenticationException } from '@/auth/errors';
import { HttpStatus } from '@nestjs/common';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[auth/strategies][LocalStrategy]', () => {
  const validateUserMock = jest.fn();

  const localStrategy = new LocalStrategy(
    {
      validateUser: validateUserMock
    } as any as AuthService
  );

  it('Validates user with correct username and password', async () => {
    validateUserMock.mockResolvedValueOnce({
      username: 'my-username',
      password: 'random-password'
    } as UserDto);

    const user = await localStrategy.validate('my-username', 'random-password');

    expect(user.username).toEqual('my-username');
    expect(user.password).toEqual('random-password');
  });

  it('Throws exception when credentials are incorrect', async () => {
    validateUserMock.mockResolvedValueOnce(null);

    try {
      await localStrategy.validate('my-username', 'random-password');
    } catch (e) {
      expect(e).toBeInstanceOf(UserAuthenticationException);
      expect(e.message).toEqual(
        'The given credentials are incorrect',
      );
      expect(e.status).toEqual(HttpStatus.UNAUTHORIZED);
    }
  });
});
