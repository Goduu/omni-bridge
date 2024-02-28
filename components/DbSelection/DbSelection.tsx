import React, { FC } from 'react'
import { DbButton } from './DbButton'
import { SiPostgresql, TbBrandMongodb } from '../Iconst'

export type DbTypes = "postgres" | "mongo" | undefined

export type DbSelectionProps = {
    selectedDb: DbTypes
    setSelectedDb: (db: DbTypes) => void
}

export const DbSelection: FC<DbSelectionProps> = ({ selectedDb, setSelectedDb }) => {

    const active = (db: string) => {
        return db === selectedDb
    }

    const handleSelection = (db: DbTypes) => {
        if (db === selectedDb) {
            setSelectedDb(undefined)
            return
        }
        setSelectedDb(db)
    }

    return (
        <div className='flex gap-4 p-2'>
            <DbButton text="PostgreSQL" active={active("postgres")} icon={<SiPostgresql width={40} />} onClick={() => handleSelection("postgres")} />
            <DbButton text="MongoDB" active={active("mongo")} icon={<TbBrandMongodb width={40} />} onClick={() => handleSelection("mongo")} />
        </div>
    )
}
