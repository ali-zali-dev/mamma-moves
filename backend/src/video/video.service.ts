import { Injectable } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Video } from './entities/video.entity';
import { VideoFiltersDto } from './dto/video-filters.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async findAll(filters?: VideoFiltersDto) {
    const where: FindOptionsWhere<Video> = {};

    if (filters) {
      if (filters.search) {
        where.title = ILike(`%${filters.search}%`);
        where.description = ILike(`%${filters.search}%`);
      }
      if (filters.category) {
        where.category = filters.category;
      }
    }

    return this.videoRepository.find({ where });
  }

  async findOne(id: number): Promise<Video> {
    return this.videoRepository.findOneOrFail({ where: { id } });
  }

  async getVideoStream(videoPath: string, range: string) {
    const videoFilePath = join(process.cwd(), 'videos', videoPath);
    const { size } = statSync(videoFilePath);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunkSize = end - start + 1;
      const file = createReadStream(videoFilePath, { start, end });

      return {
        file,
        fileInfo: {
          start,
          end,
          chunkSize,
          size,
        },
      };
    } else {
      const file = createReadStream(videoFilePath);
      return {
        file,
        fileInfo: {
          size,
          start: 0,
          end: size,
          chunkSize: size,
        },
      };
    }
  }
}
