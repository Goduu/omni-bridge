import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <Link
          href="https://github.com/Goduu/omni-bridge"
          className="flex items-center gap-2 p-2"
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
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Goduu</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">OmniBridge</Link>
        </div>
      </div>
    </footer>
  )
}
