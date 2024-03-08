import { DbOptions } from "mongodb";
import { DbTypes } from "../DbSelection/DbSelection";
import { User } from "@/lib/objects/User";


export const createMultipleUsers = async (selectedDb: DbTypes) => {
    const startTime = Date.now()

    return await fetch(`/api/${selectedDb}/createMultipleUsers`, {
        method: 'POST',
    }).then((response) => {
        if (response.ok) {
            // User added successfully
            console.log('Users added successfully');
            return { timeElapsed: Date.now() - startTime }

        } else {
            // Handle error
            console.error('Failed to add user');
            throw new Error('Failed to add user');
        }
    }
    )
}

export const readAllUsers = async (selectedDb: DbTypes) => {
    const startTime = Date.now()

    return await fetch(`/api/${selectedDb}/readAllUsers`, {
        method: 'POST',
    }).then(async (response) => {
        if (response.ok) {
            // User added successfully
            console.log('Users read successfully');
            const data = await response.json();
            return { users: data.users, timeElapsed: Date.now() - startTime };

        } else {
            // Handle error
            console.error('Failed to read users');
            throw new Error('Failed to red users');
        }
    });

}

export const updateAllUsers = async (users: User[], selectedDb: DbTypes) => {
    const startTime = Date.now()

    return await fetch(`/api/${selectedDb}/updateAllUsers`, {
        method: 'POST',
    }).then(async (response) => {
        if (response.ok) {
            // User added successfully
            console.log('Users updated successfully');
            const data = await response.json();
            return { users: data.users, timeElapsed: Date.now() - startTime };

        } else {
            // Handle error
            console.error('Failed to update users');
            throw new Error('Failed to update users');
        }
    }
    )
}

export const deleteAllUsers = async (selectedDb: DbTypes) => {
    const startTime = Date.now()

    return await fetch(`/api/${selectedDb}/deleteAllUsers`, {
        method: 'POST',
    }).then(async (response) => {
        if (response.ok) {
            // User added successfully
            console.log('Users deleted successfully');
            return { timeElapsed: Date.now() - startTime };

        } else {
            // Handle error
            console.error('Failed to delete users');
            throw new Error('Failed to delete users');

        }
    }
    )
}