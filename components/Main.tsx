import Image from 'next/image'
import Link from 'next/link'
import React, { FC, Suspense, useState } from 'react'
import Table from './table'
import ExpandingArrow from './expanding-arrow'
import TablePlaceholder from './table-placeholder'
import { StackSelection } from './StackSelection'

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
            <StackSelection />
            <Suspense fallback={<TablePlaceholder />}>
                <Table />
            </Suspense>

            <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
                <Link
                    href="https://postgres-prisma.vercel.app/"
                    className="font-medium underline underline-offset-4 hover:text-black transition-colors"
                >
                    Prisma
                </Link>
                <Link
                    href="https://postgres-starter.vercel.app/"
                    className="font-medium underline underline-offset-4 hover:text-black transition-colors"
                >
                    Starter
                </Link>
                <Link
                    href="https://postgres-drizzle.vercel.app/"
                    className="font-medium underline underline-offset-4 hover:text-black transition-colors"
                >
                    Drizzle
                </Link>
            </div>

            <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
                <Link href="https://vercel.com">
                    <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        width={100}
                        height={24}
                        priority
                    />
                </Link>
                <Link
                    href="https://github.com/vercel/examples/tree/main/storage/postgres-kysely"
                    className="flex items-center space-x-2"
                >
                    <Image
                        src="/github.svg"
                        alt="GitHub Logo"
                        width={24}
                        height={24}
                        priority
                    />
                    <p className="font-light">Source</p>
                </Link>
            </div>
        </main>
    )
}
