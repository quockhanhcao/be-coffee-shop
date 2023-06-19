import { DataSource } from 'typeorm';
import 'dotenv/config'
// export const typeORMConfig: TypeOrmModuleOptions =
//   {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     entities: ['src/modules/**/*.entity.ts'],
//     migrations: ['src/database/migrations/*.ts'],
//     subscribers: ['src/subscribers/*.subscriber.ts'],
//     namingStrategy: new SnakeNamingStrategy(),
// };

const config = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.subscriber.ts'],
});
export = config;
