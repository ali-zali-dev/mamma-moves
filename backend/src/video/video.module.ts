import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { StorageModule } from '../storage/storage.module';
import { UserPlan } from '../plan/user-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, UserPlan]), StorageModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
