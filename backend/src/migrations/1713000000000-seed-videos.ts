import { MigrationInterface, QueryRunner } from 'typeorm';
import { Video } from '../video/entities/video.entity';
import { VideoCategory } from '../video/enums/video-category.enum';
import * as fs from 'fs';
import * as path from 'path';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';

const titles = [
  'Prenatal Yoga Flow',
  'Postpartum Recovery',
  'Core Strengthening',
  'Pelvic Floor Exercises',
  'Gentle Stretching',
  'Breathing Techniques',
  'Relaxation Session',
  'Full Body Workout',
  'Back Pain Relief',
  'Mindful Movement',
];

const descriptions = [
  'A gentle workout designed for expecting mothers to maintain strength and flexibility.',
  'Essential exercises to help new mothers recover and regain core strength.',
  'Focus on building a strong foundation for your body during pregnancy.',
  'Learn techniques to support your pelvic floor health.',
  'Relaxing movements to help reduce stress and tension.',
  'Breathing exercises to support your body during pregnancy and labor.',
  'A calming session to help you connect with your body and baby.',
  'A comprehensive workout that targets all major muscle groups.',
  'Exercises specifically designed to alleviate common back pain during pregnancy.',
  'Mindful movements to help you stay present and connected with your body.',
];

export class SeedVideos1713000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const videoRepository = queryRunner.manager.getRepository(Video);
    const staticPath = path.join(__dirname, '../../static');

    // Initialize ConfigService with environment variables
    const configService = new ConfigService({
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    });

    const storageService = new StorageService(configService);
    const bucketName = configService.get<string>('AWS_S3_BUCKET');

    if (!bucketName) {
      throw new Error('AWS_S3_BUCKET environment variable is not defined');
    }

    // Create bucket if it doesn't exist
    try {
      await storageService.createBucket(bucketName);
    } catch (error) {
      // Ignore error if bucket already exists
      if (
        !(error instanceof Error) ||
        !error.message.includes('already exists')
      ) {
        throw error;
      }
    }

    // Read all video files from static folder
    const videoFiles = fs
      .readdirSync(staticPath)
      .filter((file) => file.endsWith('.mp4'));

    const categories = Object.values(VideoCategory);

    for (const videoFile of videoFiles) {
      const video = new Video();
      const randomIndex = Math.floor(Math.random() * titles.length);
      video.title = titles[randomIndex];
      video.description = descriptions[randomIndex];

      // Read video file
      const videoBuffer = fs.readFileSync(path.join(staticPath, videoFile));

      // Upload to S3
      const s3Key = `videos/${videoFile}`;
      const videoUrl = await storageService.uploadFile(
        s3Key,
        videoBuffer,
        'video/mp4',
      );
      video.url = videoUrl;
      video.isPublished = true;
      video.category =
        categories[Math.floor(Math.random() * categories.length)];

      // Try to find matching thumbnail
      const thumbnailPath = path.join(
        staticPath,
        'thumbnail',
        `${path.parse(videoFile).name}.jpg`,
      );
      if (fs.existsSync(thumbnailPath)) {
        const thumbnailBuffer = fs.readFileSync(thumbnailPath);
        const thumbnailKey = `thumbnails/${path.parse(videoFile).name}.jpg`;
        const thumbnailUrl = await storageService.uploadFile(
          thumbnailKey,
          thumbnailBuffer,
          'image/jpeg',
        );
        video.thumbnailUrl = thumbnailUrl;
      }

      await videoRepository.save(video);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Video).clear();
  }
}
