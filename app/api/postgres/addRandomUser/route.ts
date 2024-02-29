import { faker } from "@faker-js/faker";
import { db } from '@/lib/postgres/kysely'

const getRandomUser = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
            faker.image.avatar(),
    }
}

async function insertRandomUser() {

    return await db
        .insertInto('users')
        .values(getRandomUser())
        .executeTakeFirst()
}


export async function POST() {
    const res = await insertRandomUser()
    console.log('res', res)
    return Response.json({ success: true })
}
