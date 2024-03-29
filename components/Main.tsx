import Image from 'next/image'
import Link from 'next/link'
import React, { FC, Suspense, useState } from 'react'
import Table from './table'
import ExpandingArrow from './expanding-arrow'
import TablePlaceholder from './table-placeholder'
import { OmniBridge } from './OmniBridge/OmniBridge'
import { ShowAnalyticsButton } from './Analytics/ShowAnalyticsButton'

export const Main: FC = () => {

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <Link
                href="https://vercel.com/templates/next.js/postgres-kysely"
                className=" absolute right-2 top-4 group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
            >
                <p>Deploy your own to Vercel</p>
                <ExpandingArrow />
            </Link>
            <Image
                src="/logo.svg"
                alt="Omni Bridge Logo"
                width={96}
                height={96}
                priority
            />
            <h1 className=" pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Omni Bridge
            </h1>
            <p className="sm:mt-0 flex space-x-1 text-gray-600 text-sm font-medium px-10 py-2 pb-10 ">
                Test different stacks on NextJs
            </p>
            <OmniBridge />
            <Suspense fallback={<TablePlaceholder />}>
                <Table />
            </Suspense>
            <ShowAnalyticsButton />
        </main>
    )
}
