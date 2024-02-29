import { db, sql } from '@/lib/postgres/kysely'
import { faker } from '@faker-js/faker';

export async function seed() {
  const createTable = await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('name', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('email', 'varchar(255)', (cb) => cb.notNull().unique())
    .addColumn('image', 'varchar(255)')
    .addColumn('createdAt', sql`timestamp with time zone`, (cb) =>
      cb.defaultTo(sql`current_timestamp`)
    )
    .execute()
  console.log(`Created "users" table`)
  const addUsers = await db
    .insertInto('users')
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
          faker.image.avatar(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
          faker.image.avatar(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
          faker.image.avatar(),
      },
    ])
    .execute()

  console.log('Seeded database with 3 users')
  return {
    createTable,
    addUsers,
  }
}
