import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
// import { SongRepository } from './songs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { DatasourceModule } from '../datasource/datasource.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), DatasourceModule],
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
