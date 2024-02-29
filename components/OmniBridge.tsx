"use client"
import React, { FC, useState } from 'react'
import { DbSelection } from './DbSelection/DbSelection'

export const OmniBridge: FC = () => {
    const [selectedDb, setSelectedDb] = useState<"postgres" | "mongo" | undefined>()

    const handleAddUser = async () => {
        if (selectedDb) {
            try {
                const response = await fetch(`/api/${selectedDb}/addRandomUser`, {
                    method: 'POST',
                });
                if (response.ok) {
                    // User added successfully
                    console.log('User added successfully');
                } else {
                    // Handle error
                    console.error('Failed to add user');
                }
            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
    }

    return (
        <div>
            <DbSelection selectedDb={selectedDb} setSelectedDb={setSelectedDb} />
            <button
                onClick={handleAddUser}
                className={`group flex flex-col bg-white/30 p-4 aspect-square justify-center shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg items-center cursor-pointer hover:shadow-lg active:shadow-sm`}
            >
                Add new user
            </button>
        </div>
    )
}
