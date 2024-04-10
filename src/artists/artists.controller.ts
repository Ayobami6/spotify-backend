import { Controller } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistService) {}

  async createArtist(userId: number): Promise<ArtistEntity> {
    return await this.artistService.createArtist(userId);
  }
  async findArtist(userId: number): Promise<ArtistEntity> {
    return await this.artistService.findArtist(userId);
  }
}
