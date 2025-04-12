import { Controller, Get, Headers, Param, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { VideoFiltersDto } from './dto/video-filters.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';

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

  @Get('stream/:filename')
  @ApiOperation({ summary: 'Stream a video file' })
  @ApiParam({
    name: 'filename',
    description: 'Name of the video file to stream',
  })
  @ApiHeader({
    name: 'range',
    description: 'Range header for partial content requests',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Video stream started successfully',
  })
  @ApiResponse({
    status: 206,
    description: 'Partial content response',
  })
  async streamVideo(
    @Param('filename') filename: string,
    @Headers('range') range: string,
    @Res() response: Response,
  ) {
    const { file, fileInfo } = await this.videoService.getVideoStream(
      filename,
      range,
    );

    const headers = {
      'Content-Range': `bytes ${fileInfo.start}-${fileInfo.end}/${fileInfo.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': fileInfo.chunkSize,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(range ? 206 : 200, headers);
    file.pipe(response);
  }
}
