import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { VideoCategory } from '../enums/video-category.enum';

export class VideoFiltersDto {
  @ApiPropertyOptional({
    description: 'Search videos by title or description',
    example: 'My Video',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter videos by category',
    enum: VideoCategory,
    example: VideoCategory.GENERAL,
  })
  @IsEnum(VideoCategory)
  @IsOptional()
  category?: VideoCategory;
}
