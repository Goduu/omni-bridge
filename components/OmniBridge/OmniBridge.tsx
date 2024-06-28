"use client"
import React, { FC, useState } from 'react'
import { DbSelection, DbType } from '../DbSelection/DbSelection'
import { createMultipleUsers, deleteAllUsers, readAllUsers, updateAllUsers } from './crudFunctions'
import { useLocalStorage } from '@/utils/useLocalStorage'

export const OmniBridge: FC = () => {
    const [selectedDbs, setSelectedDbs] = useState<DbType[]>([])
    const [crudTime, setCrudTime] = useLocalStorage("crudTime")

    const handleRunCrud = async () => {
        const startTime = Date.now()

        selectedDbs?.forEach(selectedDb => {

            if (selectedDbs) {
                const dbCrudTime = selectedDbs && crudTime?.[selectedDb]
                try {
                    let createTime: number
                    let readTime: number
                    let updateTime: number
                    let deleteTime: number

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
                                                    console.log('createTime', createTime)
                                                    console.log('readTime', readTime)
                                                    console.log('updateTime', updateTime)
                                                    console.log('deleteTime', deleteTime)
                                                    console.log('Total time elapsed', Date.now() - startTime)

                                                    // Set the crudTime in local storage
                                                    selectedDbs && setCrudTime({
                                                        ...crudTime,
                                                        [selectedDb]: {
                                                            createTime,
                                                            readTime,
                                                            updateTime,
                                                            deleteTime
                                                        }
                                                    });
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
        })
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <DbSelection selectedDbs={selectedDbs} setSelectedDbs={setSelectedDbs} />
            <button
                onClick={handleRunCrud}
                className={`group flex flex-col bg-white/30 p-4 justify-center shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg items-center cursor-pointer hover:shadow-lg active:shadow-sm`}
            >
                Run CRUD
            </button>
        </div>
    )
}
