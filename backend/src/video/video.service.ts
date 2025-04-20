import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, MoreThan } from 'typeorm';
import { Video } from './entities/video.entity';
import { VideoFiltersDto } from './dto/video-filters.dto';
import { StorageService } from '../storage/storage.service';
import { UserPlan } from '../plan/user-plan.entity';
import { VideoAccessLevel } from './enums/video-access-level.enum';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(UserPlan)
    private userPlanRepository: Repository<UserPlan>,
    private storageService: StorageService,
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

  async findOne(id: number, userId?: string): Promise<Video> {
    const video = await this.videoRepository.findOneOrFail({ where: { id } });

    if (video.accessLevel === VideoAccessLevel.PREMIUM && userId) {
      const hasActivePlan = await this.userPlanRepository.findOne({
        where: {
          userId,
          endDate: MoreThan(new Date()),
        },
      });

      if (!hasActivePlan) {
        throw new ForbiddenException(
          'Premium content requires an active subscription',
        );
      }
    }

    // Extract the key from the S3 URL
    const url = new URL(video.url);
    const key = url.pathname.substring(1); // Remove leading slash

    // Get signed URL
    const signedUrl = await this.storageService.getSignedUrl(key);
    video.url = signedUrl;

    return video;
  }
}
