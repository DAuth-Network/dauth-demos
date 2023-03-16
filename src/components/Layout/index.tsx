import Head from 'next/head'
import React, { FC } from 'react'
import Header from './Header'

interface ILayout {
    children: React.ReactNode
}
const Layout: FC<ILayout> = ({ children }) => {
    return (

        <>

            <div className='dark text-white'>

                <main>{children}</main>
            </div></>
    )
}

export default Layout