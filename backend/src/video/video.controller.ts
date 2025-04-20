import { Controller, Get, Headers, Param, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { VideoFiltersDto } from './dto/video-filters.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all videos with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns filtered videos',
    type: [Video],
  })
  async findAll(@Query() filters?: VideoFiltersDto): Promise<Video[]> {
    return this.videoService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the video to fetch',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the video if found',
    type: Video,
  })
  @ApiResponse({
    status: 404,
    description: 'Video not found',
  })
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(id);
  }
}
