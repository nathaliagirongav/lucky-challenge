import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationStrategies } from '@/auth/strategies';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthenticationStrategies.Local) {}
