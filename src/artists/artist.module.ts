import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistsController } from './artists.controller';

@Module({
  providers: [ArtistService],
  exports: [ArtistService],
  controllers: [ArtistsController],
})
export class ArtistModule {}
