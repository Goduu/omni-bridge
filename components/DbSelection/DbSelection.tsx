import React, { FC } from 'react'
import { DbButton } from './DbButton'
import { SiPostgresql, TbBrandMongodb } from '../Iconst'

export type DbType = "postgres" | "mongo"

export type DbSelectionProps = {
    selectedDbs: DbType[]
    setSelectedDbs: (dbs: DbType[]) => void
}

export const DbSelection: FC<DbSelectionProps> = ({ selectedDbs, setSelectedDbs }) => {

    const active = (db: DbType) => {
        return selectedDbs.includes(db)
    }

    const handleSelection = (db: DbType) => {
        if (selectedDbs.includes(db)) {
            const filteredDbs = selectedDbs.filter(selectedDb => selectedDb !== db)
            setSelectedDbs(filteredDbs)
            return
        }
        setSelectedDbs([...selectedDbs, db])
    }

    return (
        <div className='flex gap-4 p-2'>
            <DbButton text="PostgreSQL" active={active("postgres")} icon={<SiPostgresql width={40} />} onClick={() => handleSelection("postgres")} />
            <DbButton text="MongoDB" active={active("mongo")} icon={<TbBrandMongodb width={40} />} onClick={() => handleSelection("mongo")} />
        </div>
    )
}
