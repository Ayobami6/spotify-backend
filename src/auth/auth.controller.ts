import {
  Body,
  Controller,
  Get,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface APIProfileResponse {
  message: string;
  user: UserEntity;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Register New User' })
  @ApiResponse({
    status: 201,
    description: 'User Created Successfully',
  })
  signUp(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.authService.signUp(createUser);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
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
  @Post('validate-2fa')
  @UseGuards(AuthGuard('jwt'))
  async validate2fa(@GetUser() user, @Body() body): Promise<boolean> {
    const userId = user.id;
    const { code } = body;
    return this.authService.validate2FA(userId, code);
  }

  @Post('disable-2fa')
  @UseGuards(AuthGuard('jwt'))
  async disable2fa(@GetUser() user): Promise<boolean> {
    const userId = user.id;
    return this.authService.disable2FA(userId);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth('JWT-auth')
  getProfile(@GetUser() user): APIProfileResponse {
    return {
      message: 'This is an authentication with an APIKey',
      user,
    };
  }
}
