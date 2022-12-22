import { Global, Module } from'@nestjs/common';
import { DatabaseConfig } from '@/database/database.config';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const AppDataSource: DataSource = new DataSource(new DatabaseConfig().getConnectionConfig());
        return AppDataSource.initialize();
      }
    }
  ],
  exports: ['DATABASE_CONNECTION'],
})

export class DatabaseModule {}
