import { db } from '@/lib/postgres/kysely'

async function deleteAllUsers() {
    return await db.deleteFrom('users').execute()
}

export async function POST() {
    const res = await deleteAllUsers()
    console.log('res', res)
    return Response.json({ success: true })
}
