import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';

const TOKEN_EXPORATION_TIME = '3600S';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: TOKEN_EXPORATION_TIME}
    })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService], 
})

export class AuthModule {}
