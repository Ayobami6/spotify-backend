import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { JwtPayload } from './interfaces/jwt.interface';
import { UserEntity } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/logger.service';

interface UserResponse {
  id: number;
  username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //   Dependency Injection
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  //   validate
  async validate(payload: JwtPayload): Promise<UserResponse> {
    try {
      const { username } = payload;
      const user = await this.dataSource
        .getRepository(UserEntity)
        .findOne({ where: { username: username } });
      if (!user) {
        throw new UnauthorizedException();
      }
      const userObj = {
        id: user.id,
        username: user.username,
        artistId: payload.artistId,
      };
      return userObj;
    } catch (error) {
      this.loggerService.error(error.message, error);
      throw new InternalServerErrorException();
    }
  }
}
