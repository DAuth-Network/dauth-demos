import React, { FC, MouseEventHandler } from 'react'


interface IPrimaryButton {
    children: React.ReactNode,
    onClick: () => void
    style?: React.CSSProperties
    passedClassName?: string,
    disabled?: boolean
}
const PrimaryButton: FC<IPrimaryButton> = ({ children, onClick, style, passedClassName, disabled }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick()
        event.preventDefault()
    }
    return (
        <button className={`rounded-full bg-main h-14 ${passedClassName} disabled:cursor-not-allowed disabled:opacity-50 outline-none`} disabled={disabled}  style={style} onClick={handleClick} >{children}</button>
    )
}

export default PrimaryButton