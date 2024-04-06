import { Controller, Get } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get()
  getAllSongs(): string {
    return this.songService.getAllSongs();
  }
}
