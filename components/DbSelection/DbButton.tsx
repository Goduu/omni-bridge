import React, { FC, ReactNode } from 'react'

type DbButtonProps = {
    text: string,
    icon: ReactNode,
    active?: boolean,
    onClick?: () => void
}

export const DbButton: FC<DbButtonProps> = ({ text, icon, active, onClick }) => {

    return (
        <button
            onClick={onClick}
            className={`group flex w-28 flex-col aspect-square justify-center shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg items-center cursor-pointer hover:shadow-lg active:shadow-sm ${active ? "bg-slate-300" : "bg-white/30"}`}
        >
            <div className='group-hover:scale-125 duration-150'
            >
                {icon}
            </div>
            {text}
        </button>
    )
}
