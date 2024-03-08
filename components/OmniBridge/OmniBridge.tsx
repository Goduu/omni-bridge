"use client"
import React, { FC, useState } from 'react'
import { DbSelection, DbTypes } from '../DbSelection/DbSelection'
import { createMultipleUsers, deleteAllUsers, readAllUsers, updateAllUsers } from './crudFunctions'

export const OmniBridge: FC = () => {
    const [selectedDb, setSelectedDb] = useState<DbTypes | undefined>()

    const handleRunCrud = async () => {
        const startTime = Date.now()
        let createTime = 0
        let readTime = 0
        let updateTime = 0
        let deleteTime = 0

        if (selectedDb) {
            try {
                createMultipleUsers(selectedDb).then((response) => {
                    if (response) {
                        createTime = response.timeElapsed
                        readAllUsers(selectedDb).then((response) => {
                            if (response) {
                                readTime = response.timeElapsed
                                updateAllUsers(response.users, selectedDb).then((response) => {
                                    if (response) {
                                        updateTime = response.timeElapsed
                                        deleteAllUsers(selectedDb).then((response) => {
                                            if (response) {
                                                deleteTime = response.timeElapsed
                                                console.log('Total time elapsed', Date.now() - startTime)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                })
            } catch (error) {
                console.error('Error adding user:', error);
            }
        }
        console.log('createTime', createTime)
        console.log('readTime', readTime)
        console.log('updateTime', updateTime)
        console.log('deleteTime', deleteTime)
    }

    return (
        <div>
            <DbSelection selectedDb={selectedDb} setSelectedDb={setSelectedDb} />
            <button
                onClick={handleRunCrud}
                className={`group flex flex-col bg-white/30 p-4 aspect-square justify-center shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg items-center cursor-pointer hover:shadow-lg active:shadow-sm`}
            >
                Run CRUD
            </button>
        </div>
    )
}
