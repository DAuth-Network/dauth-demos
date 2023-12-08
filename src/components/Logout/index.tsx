import { useRouter } from 'next/router'
import React from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import {ConnectButton} from "@rainbow-me/rainbowkit";

const Logout = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.setItem('token', '')
        router.push('/auth')
    }
    return (
        <div className='flex-1 flex justify-between items-center'>
            <div>

            </div>
            <div></div>
            <ConnectButton />

        </div>
    )
}

export default Logout