import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoCategory } from './enums/video-category.enum';
import { Response } from 'express';

describe('VideoController', () => {
  let controller: VideoController;

  const mockVideo = {
    id: 1,
    title: 'Test Video',
    description: 'Test Description',
    category: VideoCategory.GENERAL,
    path: 'test.mp4',
  };

  const mockVideos = [mockVideo];

  const mockVideoService = {
    findAll: jest.fn().mockResolvedValue(mockVideos),
    findOne: jest.fn().mockResolvedValue(mockVideo),
    getVideoStream: jest.fn().mockResolvedValue({
      file: { pipe: jest.fn() },
      fileInfo: {
        start: 0,
        end: 1000,
        chunkSize: 1000,
        size: 1000,
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: mockVideoService,
        },
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of videos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockVideos);
    });

    it('should apply filters when provided', async () => {
      const filters = { search: 'test', category: VideoCategory.GENERAL };
      await controller.findAll(filters);
    });
  });

  describe('findOne', () => {
    it('should return a single video', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockVideo);
    });
  });
});
