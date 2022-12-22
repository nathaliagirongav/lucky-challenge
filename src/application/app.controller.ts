import { Controller, Get, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('application')
export class AppController {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: DataSource
  ) {}

  @Get('status')
  status(): Record<string, unknown> {
    return {
      available: true,
      db: this.connection.isInitialized,
    }
  }
}
