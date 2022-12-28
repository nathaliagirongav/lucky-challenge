import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionHandler } from '@/errors/http-exception.handler';
import { CustomException } from '@/errors/custom.exception';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('[errors][ExceptionHandler]', () => {
  const statusMock = jest.fn();
  const jsonMock = jest.fn();
  const urlRequest = 'https://random/url';

  const host = {
    switchToHttp: () => ({
      getResponse: () => ({ status: statusMock }),
      getRequest: () => ({ url: urlRequest }),
    }),
  } as ArgumentsHost;

  const handler = new HttpExceptionHandler();

  it('Sets 500 for unexpected exception', () => {  
    statusMock.mockReturnValueOnce({ json: jsonMock });

    const error = new Error('Random Error');

    handler.catch(error, host);

    expect(statusMock).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(statusMock).toHaveBeenCalledTimes(1);
    
    const response = jsonMock.mock.calls[0][0];
    expect(response).toMatchObject({
      message: error.message,
      url: urlRequest,
    });
  });

  it('Handles HttpException', () => {
    statusMock.mockReturnValueOnce({ json: jsonMock });

    const error = new HttpException('Random Http error', HttpStatus.UNPROCESSABLE_ENTITY);

    handler.catch(error, host);

    expect(statusMock).toHaveBeenLastCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(statusMock).toHaveBeenCalledTimes(1);

    const response = jsonMock.mock.calls[0][0];
    expect(response).toMatch('Random Http error');
  });

  it('Handles CustomException', () => {
    statusMock.mockReturnValueOnce({ json: jsonMock });

    const error = new CustomException('Random custom error', HttpStatus.CONFLICT);


    handler.catch(error, host);

    expect(statusMock).toHaveBeenLastCalledWith(HttpStatus.CONFLICT);
    expect(statusMock).toHaveBeenCalledTimes(1);

    const response = jsonMock.mock.calls[0][0];
    expect(response).toMatchObject({
      statusCode: HttpStatus.CONFLICT,
      message: 'Random custom error'
    });
  });
});
