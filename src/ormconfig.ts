import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devuser',
  password: '1234',
  database: 'blog',
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // not useful on production
};

export default config;
