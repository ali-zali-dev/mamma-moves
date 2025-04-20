import { Controller, Get, Param, Query, UseGuards, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { VideoFiltersDto } from './dto/video-filters.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('video')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @ApiResponse({
    status: 403,
    description: 'Premium content requires an active subscription',
  })
  async findOne(@Param('id') id: number, @Req() req: Request): Promise<Video> {
    const userId = req.user?.['id'];
    return this.videoService.findOne(id, userId);
  }
}
