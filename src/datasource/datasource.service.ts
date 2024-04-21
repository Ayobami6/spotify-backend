import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistEntity } from '../artists/artist.entity';
import { Song } from '../songs/songs.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DatasourceService {
  private artistRepository;
  constructor(private dataSource: DataSource) {
    this.artistRepository = this.dataSource.getRepository(ArtistEntity); // how can I get access to this
  }

  songRepository = this.dataSource.getRepository(Song).extend({
    async getSongs(): Promise<Song[]> {
      return await this.find();
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
