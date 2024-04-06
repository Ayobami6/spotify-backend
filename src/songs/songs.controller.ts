import { Controller, Get } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './songs.entity';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get()
  getAllSongs(): Promise<Song[]> {
    return this.songService.getAllSongs();
  }
}
