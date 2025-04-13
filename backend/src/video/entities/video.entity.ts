import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { VideoCategory } from '../enums/video-category.enum';
import { VideoAccessLevel } from 'src/video/enums/video-access-level.enum';

@Entity()
export class Video extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({
    type: 'enum',
    enum: VideoCategory,
    default: VideoCategory.GENERAL,
  })
  category: VideoCategory;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({
    type: 'enum',
    enum: VideoAccessLevel,
    default: VideoAccessLevel.FREE,
  })
  accessLevel: VideoAccessLevel;
}
