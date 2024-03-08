import clientPromise from "@/lib/mongodb/mongodb";
import { getRandomUser } from "@/utils/getRandomUser";

async function updateAllUsers() {
    const client = await clientPromise;
    const collection = client.db('test').collection('users');
    // Implement your update logic here
    // For example, you can use the updateMany method to update all users
    await collection.updateMany({}, { $set: { status: "updated" } });
}

export async function POST() {
    await updateAllUsers();
    console.log('Users deleted and updated successfully');
    return Response.json({ message: 'Users deleted and updated successfully' });
}
