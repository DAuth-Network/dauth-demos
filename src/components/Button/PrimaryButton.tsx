import React, { FC } from 'react'


interface IPrimaryButton {
    children: React.ReactNode,
    onClick: () => void
    style?: React.CSSProperties
    passedClassName?: string
}
const PrimaryButton: FC<IPrimaryButton> = ({ children, onClick, style, passedClassName }) => {
    return (
        <button className={`rounded-full bg-main h-14 ${passedClassName}`} style={style} onClick={onClick} >{children}</button>
    )
}

export default PrimaryButton