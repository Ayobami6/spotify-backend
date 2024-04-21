import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-credentials.dto';
import { LoggerService } from 'src/logger.service';
import { UserUpdate } from './interface/user-update.types';
import { v4 as uuid } from 'uuid';

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
        apikey: uuid(),
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

  async findAUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async updateUser(
    userId: number,
    userUpdateData: UserUpdate,
  ): Promise<UserEntity> {
    const user = await this.findAUserById(userId);
    if (user) {
      this.userRepository.merge(user, userUpdateData);
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async disable2FA(userId: number): Promise<UserEntity> {
    const user = await this.findAUserById(userId);
    if (user) {
      user.enable2FA = false;
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async generateAPIKey(userId: number): Promise<string> {
    const apiKey = uuid();
    // find user by id
    const user = await this.updateUser(userId, { apiKey });
    return user.apiKey;
  }
}
