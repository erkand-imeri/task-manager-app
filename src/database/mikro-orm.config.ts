import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Task } from './entities/Task';

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
  entities: [Task],
  migrations: {
    path: './src/database/migrations',
    glob: '!(*.d).{js,ts}',
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
