import clientPromise from "@/lib/mongodb/mongodb";
import { getRandomUser } from "@/utils/getRandomUser";

async function insertMultipleUsers() {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    const users = Array.from({ length: 1000 }, () => getRandomUser());
    await collection.insertMany(users);
}


export async function POST() {
    const res = await insertMultipleUsers()
    console.log('res', res)
    return Response.json({ success: true })
}
