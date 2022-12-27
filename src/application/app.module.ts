import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from '@/application/app.controller';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { ProfileModule } from '@/profile/profile.module';
import { LocationModule } from '@/location/location.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ProfileModule,
    LocationModule
  ],
  controllers: [AppController],
})

export class AppModule {}
