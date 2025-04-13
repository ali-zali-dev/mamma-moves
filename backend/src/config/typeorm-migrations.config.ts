import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST') || 'localhost',
  port: parseInt(configService.get('POSTGRES_PORT') as string, 10) || 5432,
  username: configService.get('POSTGRES_USER') || 'admin',
  password: configService.get('POSTGRES_PASSWORD') || '123456',
  database: configService.get('POSTGRES_DB') || 'mammamoves',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
