import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

@Module({
  providers: [AuthService, UsersService],
  imports: [UsersModule],
  exports: [AuthService],
})
export class AuthModule {}
