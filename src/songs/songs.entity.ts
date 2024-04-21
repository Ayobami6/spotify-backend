import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SongCategory } from './types';
import { ArtistEntity } from '../artists/artist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  releaseDate: Date;

  @Column('date')
  duration: Date;

  @Column()
  album: string;

  @Column('text')
  lyrics: string;

  @Column({
    type: 'enum',
    enum: SongCategory,
    default: SongCategory.Rock,
    nullable: true,
  })
  category: SongCategory;

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: ArtistEntity[];
}
