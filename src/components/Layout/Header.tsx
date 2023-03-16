import React, { useEffect } from 'react'
import Image from 'next/image'
import { ReactSVG } from 'react-svg';
import css from 'styled-jsx/css';
import Logo from '../Logo';
import PrimaryButton from '../Button/PrimaryButton';
import { useRouter } from 'next/router';


const Header = () => {
    const router = useRouter()
   
    useEffect(() => {
        // router.push('/auth')
        const token = localStorage.getItem('token')
        if (!token && router.pathname !== '/auth') {
            router.push('/auth')
        }
    }, [router])
    const onclick = () => {
        router.push('/')
    }
    return (
        <div className='w-screen flex py-12'>
            <div className='flex-row flex items-center  w-1/2'>
                <div className='flex flex-row items-center text-2xl cursor-pointer' onClick={onclick}>
                    <Logo />
                    <div className='px-2 font-medium'>
                        DAuth Network
                    </div>
                </div>

                <div className='bg-purple-600 bg-opacity-30 rounded-lg px-2 ml-2 '>
                    Demo
                </div>
            </div>
          

        </div>
    )
}

export default Header