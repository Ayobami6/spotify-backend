import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signIn-credentials.dto';
import { UserEntity } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUser);
  }

  async signIn(signIn: SignInUserDto): Promise<UserEntity> {
    return await this.userService.signInUser(signIn);
  }
}
