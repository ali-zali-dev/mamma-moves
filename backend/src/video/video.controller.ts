import {
  Controller,
  Get,
  Headers,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream/:filename')
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