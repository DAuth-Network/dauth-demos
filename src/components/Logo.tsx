import React, { FC } from 'react'
import { ReactSVG } from 'react-svg'

interface ILogo {
    className?: string
}

const Logo:FC<ILogo> = ({className}) => {
    return (
        <ReactSVG src="/logo.svg" className={`${className}`} width={1}/>
    )
}

export default Logo