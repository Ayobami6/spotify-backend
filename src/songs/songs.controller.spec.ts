import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { SongCategory } from './types';

describe('SongController', () => {
  let controller: SongsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      //   depends on
      providers: [
        SongsService,
        {
          provide: SongsService,
          useValue: {
            getAllSongs: jest
              .fn()
              .mockResolvedValue([{ id: 1, title: 'Songs' }]),
            createSong: jest
              .fn()
              .mockImplementation((createSongDto: CreateSongDto) => {
                return Promise.resolve({ id: 'a uuid', ...createSongDto });
              }),
            findOneById: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve({ id: id, title: 'Dancing' });
            }),
          },
        },
      ],
    }).compile(); //1
    controller = module.get<SongsController>(SongsController); //2
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getSongs', () => {
    it('should give me the array of songs', async () => {
      const songs = await controller.getAllSongs();
      expect(songs).toEqual([{ id: 1, title: 'Songs' }]);
    });
  });
  describe('create song', () => {
    it('should create a new song', async () => {
      const createSongDto: CreateSongDto = {
        title: 'New Song',
        artists: ['1'],
        releaseDate: new Date('2015-02-10'),
        duration: new Date(),
        album: 'New Album',
        lyrics: 'New Lyrics',
        category: SongCategory.HipHop,
      };
      const song = await controller.createSong(createSongDto);
      expect(song.title).toEqual('New Song');
    });
  });
  describe('findOne', () => {
    it('Should findone song', async () => {
      const song = await controller.findOne(1);
      expect(song).toEqual({ id: 1, title: 'Dancing' });
    });
  });
});
