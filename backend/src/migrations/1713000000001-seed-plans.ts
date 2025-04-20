import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plan } from '../plan/plan.entity';

export class SeedPlans1713000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const planRepository = queryRunner.manager.getRepository(Plan);

    const plans = [
      {
        title: 'Monthly Plan',
        description: 'Access to all premium videos, new content weekly, personalized workout plans, and the ability to cancel anytime.',
        price: 14.99,
      },
      {
        title: 'Annual Plan',
        description: 'All Monthly Plan features, save 17% compared to monthly, exclusive seasonal content, and priority support.',
        price: 149.99,
      },
    ];

    for (const planData of plans) {
      const plan = new Plan();
      plan.title = planData.title;
      plan.description = planData.description;
      plan.price = planData.price;
      await planRepository.save(plan);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const planRepository = queryRunner.manager.getRepository(Plan);
    await planRepository.delete({});
  }
} 