import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { FindOneOptions, Repository } from 'typeorm';
import { Song } from './songs.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song.dto';
describe('SongService', () => {
  let service: SongsService;
  let repo: Repository<Song>;
  const oneSong = { id: 'a uuid', title: 'Lover' };
  const songArray = [{ id: 'a uuid', title: 'Lover' }];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: {
            find: jest
              .fn()
              .mockImplementation(() => Promise.resolve(songArray)),
            findOneOrFail: jest
              .fn()
              .mockImplementation((options: FindOneOptions<Song>) => {
                return Promise.resolve(oneSong);
              }),
            create: jest
              .fn()
              .mockImplementation((createSongDTO: CreateSongDto) => {
                return Promise.resolve(oneSong);
              }),
            save: jest.fn(),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateSongDTO: CreateSongDto) => {
                  return Promise.resolve(oneSong);
                },
              ),
            delete: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve({ affected: 1 }),
              ),
          },
        },
      ],
    }).compile();
    service = module.get<SongsService>(SongsService);
    repo = module.get<Repository<Song>>(getRepositoryToken(Song));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
