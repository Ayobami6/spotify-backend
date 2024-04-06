import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Song } from './songs.entity';

@Injectable()
export class SongsService {
  // lets inject the datasource dependency
  constructor(private dataSource: DataSource) {}

  // lets override the Repostory methosa

  songRepository = this.dataSource.getRepository(Song).extend({
    async getSongs(): Promise<Song[]> {
      return await this.find();
    },
  });

  getAllSongs(): Promise<Song[]> {
    return this.songRepository.getSongs();
  }
}
