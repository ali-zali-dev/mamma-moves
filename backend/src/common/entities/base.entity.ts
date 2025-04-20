import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Exclude()
export abstract class BaseEntity {
  @Expose()
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @Expose()
  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose()
  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @Column({ select: false })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
