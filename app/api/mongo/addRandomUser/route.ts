import clientPromise from "@/lib/mongodb/mongodb";
import { faker } from "@faker-js/faker";

const getRandomUser = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
            faker.image.avatar(),
    }
}

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
