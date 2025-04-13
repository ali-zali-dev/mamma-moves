import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { VideoCategory } from './enums/video-category.enum';
import { VideoFiltersDto } from './dto/video-filters.dto';

describe('VideoService', () => {
  let service: VideoService;
  let videoRepository: Repository<Video>;

  const mockVideo = {
    id: 1,
    title: 'Test Video',
    description: 'Test Description',
    category: VideoCategory.GENERAL,
    path: 'test.mp4',
  };

  const mockVideos = [mockVideo];

  const mockRepository: Partial<Repository<Video>> = {
    find: jest.fn().mockResolvedValue(mockVideos),
    findOneOrFail: jest.fn().mockResolvedValue(mockVideo),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(Video),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
    videoRepository = module.get<Repository<Video>>(getRepositoryToken(Video));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of videos', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockVideos);
      expect(videoRepository.find).toHaveBeenCalled();
    });

    it('should apply search filter', async () => {
      const filters: VideoFiltersDto = { search: 'test' };
      await service.findAll(filters);
      expect(videoRepository.find).toHaveBeenCalledWith({
        where: {
          title: expect.any(Object),
          description: expect.any(Object),
        },
      });
    });

    it('should apply category filter', async () => {
      const filters: VideoFiltersDto = { category: VideoCategory.GENERAL };
      await service.findAll(filters);
      expect(videoRepository.find).toHaveBeenCalledWith({
        where: {
          category: VideoCategory.GENERAL,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single video', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockVideo);
      expect(videoRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if video not found', async () => {
      jest
        .spyOn(videoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      await expect(service.findOne(999)).rejects.toThrow();
    });
  });
});
