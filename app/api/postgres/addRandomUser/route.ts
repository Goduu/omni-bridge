import { db } from '@/lib/postgres/kysely'
import { getRandomUser } from '@/utils/getRandomUser'

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
