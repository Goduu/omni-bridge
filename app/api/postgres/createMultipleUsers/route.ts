import { db } from '@/lib/postgres/kysely'
import { getRandomUser } from '@/utils/getRandomUser'

async function createMultipleUsers() {
    const users = Array.from({ length: 1000 }, () => getRandomUser());

    return await db
        .insertInto('users')
        .values(users)
        .execute()
}


export async function POST() {
    const res = await createMultipleUsers()
    console.log('res', res)
    return Response.json({ success: true })
}
