import { db } from '@/lib/postgres/kysely'

async function updateAllUsers() {
    return await db.updateTable('users').set({ status: 'updated' }).execute()

}

export async function POST() {
    await updateAllUsers()

    return Response.json({ success: true })
}
