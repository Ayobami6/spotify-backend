import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Song } from './songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { DatasourceService } from 'src/datasource/datasource.service';
import { ArtistEntity } from 'src/artists/artist.entity';

export interface SongArtist {
  songsId: number;
  artistsId: number;
}
@Injectable()
export class SongsService {
  // lets inject the datasource dependency
  private songRepository;
  private artistRepository;

  constructor(
    private dataSource: DataSource,
    private dataSourceService: DatasourceService,
  ) {
    this.songRepository = this.dataSourceService.songRepository;
    this.artistRepository = this.dataSource.getRepository(ArtistEntity);
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

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    // lets destructure
    const { title, artists, releaseDate, duration, album, lyrics, category } =
      createSongDto;
    const artistsObj = await this.artistRepository.findByIds(artists);
    console.log(artistsObj);

    const song = this.dataSource.getRepository(Song).create({
      title,
      artists: artistsObj,
      releaseDate,
      duration,
      album,
      lyrics,
      category,
    });
    return await this.dataSource.getRepository(Song).save(song);
  }

  async findOneById(id: number): Promise<Song> {
    try {
      const song = await this.songRepository.findOneSong(id);
      console.log(song);
      return song;
    } catch (error) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }

  async fetchAllSongArtistTable(): Promise<SongArtist[]> {
    const result = await this.dataSource.query(`SELECT * FROM songs_artists`);
    console.log(result);
    return result;
  }
}
