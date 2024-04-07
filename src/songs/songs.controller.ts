import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { SongArtist } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get()
  getAllSongs(): Promise<Song[]> {
    return this.songService.getAllSongs();
  }

  @Post()
  createSong(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songService.createSong(createSongDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Song> {
    return this.songService.findOneById(id);
  }

  // @Get()
  // fetchAllSongArtistTable(): Promise<SongArtist[]> {
  //   return this.songService.fetchAllSongArtistTable();
  // }
}
