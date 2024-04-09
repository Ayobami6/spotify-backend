import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signIn-credentials.dto';

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
}
