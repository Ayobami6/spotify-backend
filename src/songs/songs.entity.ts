import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SongCategory } from './types';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releaseDate: Date;

  @Column('date')
  duration: Date;

  @Column()
  album: string;

  @Column('text')
  lyrics: string;

  @Column()
  category: SongCategory;
}
