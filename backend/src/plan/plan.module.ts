import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { UserPlan } from './user-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, UserPlan])],
  exports: [TypeOrmModule],
})
export class PlanModule {}
