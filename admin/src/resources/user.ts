import { Column, Entity } from 'typeorm';
import { BaseEntity } from './common.js';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

export default {
  resource: User,
  options: {
    titleProperty: 'email',
  },
}; 