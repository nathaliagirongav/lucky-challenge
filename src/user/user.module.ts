import { LocationModule } from '@/location/location.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { UserCreationService } from '@/user/user.creation.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [LocationModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserCreationService, UserService],
  exports: [UserService],
})

export class UserModule {}
