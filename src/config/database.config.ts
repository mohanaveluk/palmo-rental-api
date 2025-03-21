import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'palmo_rental',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  migrationsRun: true,
  migrations: [__dirname + '/database/migrations/**/*.{ts,js}'],
}));