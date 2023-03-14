import React from 'react'
import Image from 'next/image'
import { ReactSVG } from 'react-svg';
import css from 'styled-jsx/css';
import Logo from '../Logo';
import PrimaryButton from '../Button/PrimaryButton';
import { useRouter } from 'next/router';


const Header = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.setItem('token', '')
        router.push('/auth')
    }
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
            <div className='flex-1 flex justify-between items-center'>
                <div></div>
                <PrimaryButton className='w-[100px] h-[32px]' onClick={logout}>Log out</PrimaryButton>
            </div>

        </div>
    )
}

export default Header