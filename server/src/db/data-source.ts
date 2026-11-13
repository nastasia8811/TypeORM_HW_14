import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entities/User.ts'
import { Newspost } from '../entities/Newspost.ts'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,

  // for local developing
  synchronize: true,

  entities: [User, Newspost],
})
