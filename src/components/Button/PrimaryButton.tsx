import React, { FC } from 'react'


interface IPrimaryButton {
    children: React.ReactNode,
    onClick: () => void
    style?: React.CSSProperties
    passedClassName?: string,
    disabled?: boolean
}
const PrimaryButton: FC<IPrimaryButton> = ({ children, onClick, style, passedClassName, disabled }) => {
    return (
        <button className={`rounded-full bg-main h-14 ${passedClassName} disabled:cursor-not-allowed disabled:opacity-50 outline-none`} disabled={disabled}  style={style} onClick={onClick} >{children}</button>
    )
}

export default PrimaryButton