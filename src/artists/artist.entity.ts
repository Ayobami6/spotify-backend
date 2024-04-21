import { Song } from '../songs/songs.entity';
import { UserEntity } from '../users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
