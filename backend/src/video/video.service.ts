import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VideoService {
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