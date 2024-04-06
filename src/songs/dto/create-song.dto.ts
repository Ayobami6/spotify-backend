import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { SongCategory } from '../types';

export class CreateSongDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  artists: string[];

  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  album: string;

  @IsDateString()
  duration: Date;

  @IsNotEmpty()
  lyrics: string;

  @IsOptional()
  @IsEnum(SongCategory)
  category: SongCategory;
}
