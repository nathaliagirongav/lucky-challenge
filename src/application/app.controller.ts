import { Controller, Get } from '@nestjs/common';

@Controller('application')
export class AppController {
  constructor() {}

  @Get('status')
  status(): Record<string, unknown> {
    return {
      available: true,
    }
  }
}
