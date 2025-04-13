import { Column, Entity } from 'typeorm';

import { BaseEntity } from './common.js';

export enum VideoCategory {
    PREGNANCY = 'PREGNANCY',
    POSTPARTUM = 'POSTPARTUM',
    GENERAL = 'GENERAL',
    SPECIALIZED = 'SPECIALIZED',
  }

  export enum VideoAccessLevel {
    FREE = 'FREE',
    PREMIUM = 'PREMIUM',
  }

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
export default {
  resource: Video,
  options: {
    titleProperty: 'id',
  },
};
