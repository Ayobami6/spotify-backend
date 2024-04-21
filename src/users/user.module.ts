import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerService } from 'src/logger.service';

@Module({
  providers: [UserService, LoggerService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
