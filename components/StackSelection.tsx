"use client"
import React, { FC, useState } from 'react'
import { DbSelection } from './DbSelection/DbSelection'

export const StackSelection: FC = () => {
    const [selectedDb, setSelectedDb] = useState<"postgres" | "mongo" | undefined>()

    return (
        <div>
            <DbSelection selectedDb={selectedDb} setSelectedDb={setSelectedDb} />
        </div>
    )
}
