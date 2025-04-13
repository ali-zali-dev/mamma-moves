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
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Expose()
  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @ApiProperty()
  @Column({ select: false })
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
