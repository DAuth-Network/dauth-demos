import React, {FC, useEffect} from 'react'
import Image from 'next/image'
import {ReactSVG} from 'react-svg';
import css from 'styled-jsx/css';
import Logo from '../Logo';
import PrimaryButton from '../Button/PrimaryButton';
import {useRouter} from 'next/router';
import {
    ConnectButton,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

interface IHeader {
    className?: string
}

const Header: FC<IHeader> = ({className}) => {
    const router = useRouter()
    const onclick = () => {
        router.push('/')
    }
    return (
        <div className={`w-full flex md:py-12 py-6 px-6 ${className}`}>
            <div className='flex-row flex items-center lg:w-1/2'>
                <div className='flex flex-row items-center  cursor-pointer' onClick={onclick}>
                    {/*<Image src={"/logo.png"} alt={''} width={100}       height={100}*/}
                    <div className='px-2 text-xl lg:text-2xl font-medium'>
                        Openid3 Authentication
                    </div>
                </div>


                <div>
                </div>

            </div>


        </div>
    )
}

export default Header