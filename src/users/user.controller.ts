import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/apikey')
  @UseGuards(AuthGuard('jwt'))
  getAPIKey(@GetUser() user: UserEntity): Promise<string> {
    return this.userService.generateAPIKey(user.id);
  }
}
