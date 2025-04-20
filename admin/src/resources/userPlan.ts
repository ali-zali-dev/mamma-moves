import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './common.js';
import { User } from './user.js';
import { Plan } from './plan.js';

@Entity()
export class UserPlan extends BaseEntity {
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'planId' })
    plan: Plan;

    @Column()
    planId: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;
}

export default {
    resource: UserPlan,
    options: {
        titleProperty: 'id',
        properties: {
            user: {
                reference: 'User',
            },
            plan: {
                reference: 'Plan',
            },
            startDate: {
                type: 'datetime',
            },
            endDate: {
                type: 'datetime',
            },
        },
    },
}; 