"use client"
import React, { FC, useState } from 'react'
import { FaChartColumn } from '../Iconst'
import { BarChart } from './BarChart'

export const ShowAnalyticsButton: FC = () => {
    const [showAnalytics, setShowAnalytics] = useState(false)

    return (
        <>
            <div className={`fixed w-1/2 aspect-square backdrop-blur-xl ${!showAnalytics && "hidden"}`}>
                <BarChart />
            </div>
            <button className='group fixed right-10 bottom-10 text-lg flex gap-4 items-center' onClick={() => setShowAnalytics(!showAnalytics)}>
                <p className='scale-0 group-hover:scale-100 duration-150'>
                    Show Analytics
                </p>
                <div className='rounded-full bg-slate-300 p-4'>
                    <FaChartColumn width={40} className='group-hover:scale-105 duration-150' />
                </div>
            </button>
        </>
    )
}
