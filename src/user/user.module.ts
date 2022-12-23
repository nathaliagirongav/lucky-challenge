import { LocationModule } from '@/location/location.module';
import { Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { UserCreationService } from '@/user/user.creation.service';

@Module({
  imports: [LocationModule],
  controllers: [UserController],
  providers: [UserCreationService, UserService]
})

export class UserModule {}
