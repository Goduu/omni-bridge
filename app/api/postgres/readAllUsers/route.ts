import { db } from '@/lib/postgres/kysely'

async function readAllUsers() {
    return await db.selectFrom('users').execute()
}


export async function POST() {
    const users = await readAllUsers()
    return Response.json({ users: users })
}
