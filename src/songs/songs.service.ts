import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Song } from './songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { DatasourceService } from 'src/datasource/datasource.service';

@Injectable()
export class SongsService {
  // lets inject the datasource dependency
  private songRepository;

  constructor(
    private dataSource: DataSource,
    private dataSourceService: DatasourceService,
  ) {
    this.songRepository = this.dataSourceService.songRepository;
  }

  // lets override the Repostory methosa

  // songRepository = this.dataSource.getRepository(Song).extend({
  //   async getSongs(): Promise<Song[]> {
  //     return await this.find();
  //   },

  //   async createSong(createSongDto): Promise<Song> {
  //     // lets destructure
  //     const { title, artists, releaseDate, duration, album, lyrics, category } =
  //       createSongDto;
  //     const song = this.create({
  //       title,
  //       artists,
  //       releaseDate,
  //       duration,
  //       album,
  //       lyrics,
  //       category,
  //     });
  //     return await this.save(song);
  //   },

  //   async findOneSong(id: number): Promise<Song> {
  //     const song = await this.findOne({ where: { id: id } });
  //     if (!song) {
  //       throw new NotFoundException(`Song with ID ${id} not found`);
  //     }
  //     return song;
  //   },
  // });

  getAllSongs(): Promise<Song[]> {
    return this.songRepository.getSongs();
  }

  createSong(createSongDto: CreateSongDto): Promise<Song> {
    return this.songRepository.createSong(createSongDto);
  }

  findOneById(id: number): Promise<Song> {
    try {
      const song = this.songRepository.findOneSong(id);
      return song;
    } catch (error) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
