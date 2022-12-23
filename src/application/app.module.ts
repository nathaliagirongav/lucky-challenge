import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from '@/application/app.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
})

export class AppModule {}
