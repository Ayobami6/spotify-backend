import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ArtistService {
  private artistRepository;
  private logger = new Logger();
  constructor(private dataSource: DataSource) {
    this.artistRepository = this.dataSource.getRepository(ArtistEntity);
  }

  async createArtist(user: UserEntity): Promise<ArtistEntity> {
    try {
      const artist = await this.artistRepository.create({
        user,
      });
      return await this.artistRepository.save(artist);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findArtist(userId: number): Promise<ArtistEntity> {
    return await this.artistRepository.findOneBy({ user: { id: userId } });
  }
}
