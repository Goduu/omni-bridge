import clientPromise from "@/lib/mongodb/mongodb";
import { getRandomUser } from "@/utils/getRandomUser";

async function deleteAllUsers() {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    await collection.deleteMany({});
}


export async function POST() {
    const res = await deleteAllUsers()
    console.log('res', res)
    return Response.json({ res })
}
