import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from 'src/songs/songs.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DatasourceService {
  constructor(private dataSource: DataSource) {}

  songRepository = this.dataSource.getRepository(Song).extend({
    async getSongs(): Promise<Song[]> {
      return await this.find();
    },

    async createSong(createSongDto): Promise<Song> {
      // lets destructure
      const { title, artists, releaseDate, duration, album, lyrics, category } =
        createSongDto;
      const song = this.create({
        title,
        artists,
        releaseDate,
        duration,
        album,
        lyrics,
        category,
      });
      return await this.save(song);
    },

    async findOneSong(id: number): Promise<Song> {
      const song = await this.findOne({ where: { id: id } });
      if (!song) {
        throw new NotFoundException(`Song with ID ${id} not found`);
      }
      return song;
    },
  });
}
