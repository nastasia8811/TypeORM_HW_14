import { faker } from '@faker-js/faker'
import { AppDataSource } from './data-source.ts'
import { User } from '../entities/User.ts'
import { Newspost } from '../entities/Newspost.ts'
import { hashPassword } from '../auth.ts'
import { logger } from '../logger.ts'

const GENRES = ['Politic', 'Business', 'Sport', 'Other']
const DEFAULT_EMAIL = 'admin@test.com'
const DEFAULT_PASSWORD = 'admin123'

await AppDataSource.initialize()

const users = AppDataSource.getRepository(User)
const newsposts = AppDataSource.getRepository(Newspost)

let author = await users.findOneBy({ email: DEFAULT_EMAIL })
if (!author) {
  author = await users.save(
    users.create({ email: DEFAULT_EMAIL, password: hashPassword(DEFAULT_PASSWORD) })
  )
}

const posts = Array.from({ length: 20 }, () =>
  newsposts.create({
    title: faker.lorem.sentence({ min: 3, max: 6 }).slice(0, 50),
    text: faker.lorem.paragraph().slice(0, 256),
    genre: faker.helpers.arrayElement(GENRES),
    isPrivate: false,
    author,
  })
)
await newsposts.save(posts)

logger.info(`Seed done: ${posts.length} newsposts`)
await AppDataSource.destroy()
