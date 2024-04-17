import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signIn-credentials.dto';
import { UserEntity } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { DataSource } from 'typeorm';
import {
  AccessTokenResponse,
  Enable2FA,
  JwtPayload,
} from './interfaces/jwt.interface';
import * as bcrypt from 'bcrypt';
import { ArtistService } from 'src/artists/artist.service';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {
  private userRepository;
  constructor(
    private userService: UserService,
    private dataSource: DataSource,
    private jwtService: JwtService,
    private artistsService: ArtistService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async signUp(createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUser);
  }

  async signIn(
    signIn: SignInUserDto,
  ): Promise<AccessTokenResponse | { validate2FA: string; message: string }> {
    const { username, password } = signIn;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // lets gte the artist first
      const artist = await this.artistsService.findArtist(user.id);
      let payload: JwtPayload;
      if (artist) {
        payload = { username, artistId: artist.id };
      } else {
        payload = { username };
      }
      if (user.enable2FA && user.twoFASecret) {
        return {
          validate2FA: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Send the code from your authenticator app to the provided url',
        };
      } else {
        // generate access token
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      }
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  // enable twofactor authentication secret
  async enable2FA(userId: number): Promise<Enable2FA> {
    const user = await this.userService.findAUserById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret({ length: 20 });
    console.log(secret);
    const updateUser = await this.userService.updateUser(userId, {
      twoFASecret: secret.base32,
      enable2FA: true,
    });
    return { secret: updateUser.twoFASecret };
  }

  // add validate 2fa service
  async validate2FA(userId: number, code: string): Promise<boolean> {
    try {
      const user = await this.userService.findAUserById(userId);
      return speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: 'base32',
        token: code,
      });
    } catch (error) {
      throw new HttpException('Invalid 2FA code', HttpStatus.UNAUTHORIZED);
    }
  }

  async disable2FA(userId: number): Promise<boolean> {
    const user = await this.userService.updateUser(userId, {
      enable2FA: false,
      twoFASecret: null,
    });
    return user.enable2FA;
  }
}
// test commit
