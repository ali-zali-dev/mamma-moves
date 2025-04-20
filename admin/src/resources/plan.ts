import { Column, Entity } from 'typeorm';

import { BaseEntity } from './common.js';

@Entity()
export class Plan extends BaseEntity {
    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}

export default {
    resource: Plan,
    options: {
        titleProperty: 'title',
        properties: {
            price: {
                type: 'currency',
            },
        },
    },
}; 