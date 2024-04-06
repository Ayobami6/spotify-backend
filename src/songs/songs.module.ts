import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  providers: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}
