import pg from 'pg';

const connectDatabase = () => {
  return new pg.Pool({
    user: 'postgres',
    password: 'password',
    database: 'postgres',
    host: 'localhost',
    port: 5432,
  });
};

export { connectDatabase };
