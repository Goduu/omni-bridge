import clientPromise from "@/lib/mongodb/mongodb";
import { getRandomUser } from "@/utils/getRandomUser";

async function readAllUsers() {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    return await collection.find().toArray();
}


export async function POST() {
    const users = await readAllUsers()
    return Response.json({ users: users })
}
