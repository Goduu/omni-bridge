import clientPromise from "@/lib/mongodb/mongodb";
import { getRandomUser } from "@/utils/getRandomUser";

async function insertRandomUser() {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    await collection.insertOne(getRandomUser());
}


export async function POST() {
    const res = await insertRandomUser()
    console.log('res', res)
    return Response.json({ success: true })
}
