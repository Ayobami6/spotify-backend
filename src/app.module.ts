import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';

@Module({
  controllers: [AppController],
  imports: [SongsModule],
  providers: [AppService],
})
export class AppModule {}
