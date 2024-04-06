import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  getAllSongs(): string {
    return 'All songs';
  }
}
