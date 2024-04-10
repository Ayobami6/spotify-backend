import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signIn-credentials.dto';
import { UserEntity } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { DataSource } from 'typeorm';
import { AccessTokenResponse, JwtPayload } from './interfaces/jwt.interface';
import * as bcrypt from 'bcrypt';
import { ArtistService } from 'src/artists/artist.service';

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

  async signIn(signIn: SignInUserDto): Promise<AccessTokenResponse> {
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
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
