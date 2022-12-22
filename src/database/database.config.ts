import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

export class DatabaseConfig {
  private readonly envConfig: Record<string, string>;

  constructor() {
    dotenv.config();
    this.envConfig = { ...process.env, ...dotenv.parse };
  }

  public getConnectionConfig(): DataSourceOptions {
    return {
      type: 'mysql',
      timezone: this.envConfig['APP_TIMEZONE'],
      host: this.envConfig['DATABASE_HOST'] || 'lucky-challenge-mysql',
      username: this.envConfig['DATABASE_USERNAME'] || 'root',
      password: this.envConfig['DATABASE_PASSWORD'] || 'root',
      database: this.envConfig['DATABASE_NAME'] || 'lucky-challenge',
      port: Number(this.envConfig['DATABASE_PORT']) || 2409,
      synchronize: false,
      migrationsRun: false,
    };
  }
}
