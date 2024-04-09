import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-credentials.dto';

@Injectable()
export class UserService {
  //  User repository
  private userRepository;
  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = createUserDto;
    // hash password
    const salt = bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async signInUser(signInDto: SignInUserDto): Promise<UserEntity> {
    const { username, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
