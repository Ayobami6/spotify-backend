import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signIn-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Enable2FA } from './interfaces/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.authService.signUp(createUser);
  }

  @Post('/signin')
  signIn(@Body() signUser: SignInUserDto): Promise<any> {
    return this.authService.signIn(signUser);
  }

  @Post('enable-2fa')
  @UseGuards(AuthGuard('jwt'))
  async enable2fa(@GetUser() user): Promise<Enable2FA> {
    try {
      const userId = user.id;
      return this.authService.enable2FA(userId);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
