import { Injectable } from '@nestjs/common';
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
  async findOne(id: string): Promise<Video> {
    return this.videoRepository.findOneOrFail({ where: { id } });
  }
}
