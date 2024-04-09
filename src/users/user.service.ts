import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-credentials.dto';
import { LoggerService } from 'src/logger.service';

@Injectable()
export class UserService {
  //  User repository
  private logger = new Logger();
  private userRepository;
  constructor(
    private dataSource: DataSource,
    private loggerService: LoggerService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { username, password } = createUserDto;
      // hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code == 23505) {
        this.loggerService.error(error.message, error);
        this.logger.error(error.message, error.stack);
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      }
    }
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
