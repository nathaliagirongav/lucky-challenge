import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  dropSchema: false,
  synchronize: false,
  logging: true,
  "migrations": [
    "migrations/**/*.ts"
  ],
});

export default AppDataSource;
