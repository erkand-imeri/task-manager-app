import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Task } from './entities/Task';

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
  entities: [Task],
  migrations: {
    path: './src/migrations', // Path to the folder with migration files
    glob: '!(*.d).{js,ts}',
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
