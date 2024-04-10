import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './artist.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistService) {}

  @Post()
  async createArtist(@GetUser() user: UserEntity): Promise<ArtistEntity> {
    return await this.artistService.createArtist(user);
  }

  @Get()
  async findArtist(userId: number): Promise<ArtistEntity> {
    return await this.artistService.findArtist(userId);
  }
}
