import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from '@/application/app.controller';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [AppController],
})
export class AppModule {}
