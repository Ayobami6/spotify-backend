import { Repository } from 'typeorm';
import { Song } from './songs.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateSongDto } from './dto/create-song.dto';

export class SongRepository extends Repository<Song> {
  async getSongs(): Promise<Song[]> {
    return await this.find();
  }

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
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
  }

  async findOneSong(id: number): Promise<Song> {
    const song = await this.findOne({ where: { id: id } });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }
}
