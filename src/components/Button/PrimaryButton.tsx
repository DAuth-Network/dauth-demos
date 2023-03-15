import React, { FC } from 'react'


interface IPrimaryButton {
    children: React.ReactNode,
    onClick: () => void
    style?: React.CSSProperties
    className?: string
}
const PrimaryButton: FC<IPrimaryButton> = ({ children, onClick, style, className }) => {
    console.log(className)
    return (
        <button className={`w-full rounded-full bg-main h-14 ${className}`} style={style} onClick={onClick} >{children}</button>
    )
}

export default PrimaryButton