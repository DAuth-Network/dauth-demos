import React from 'react'
import Image from 'next/image'
import { ReactSVG } from 'react-svg';
import css from 'styled-jsx/css';
import Logo from '../Logo';


const Header = () => {

    return (
        <div className='w-screen flex fixed h-16 px-20'>
            <div className='flex-row flex items-center  w-1/2'>
                <div className='flex flex-row items-center text-2xl cursor-pointer'>
                    <Logo />
                    <div className='px-2 font-medium'>
                        DAuth Network
                    </div>
                </div>

                <div className='bg-purple-600 bg-opacity-30 rounded-lg px-2 ml-2 '>
                    demo
                </div>
            </div>
            <div className='flex-1'>

            </div>

        </div>
    )
}

export default Header