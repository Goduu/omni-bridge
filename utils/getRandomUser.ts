import { faker } from "@faker-js/faker"

export const getRandomUser = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image:
            faker.image.avatar(),
        status: "created"
    }
}
