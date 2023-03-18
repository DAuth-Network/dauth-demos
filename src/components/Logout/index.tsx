import { useRouter } from 'next/router'
import React from 'react'
import PrimaryButton from '../Button/PrimaryButton'

const Logout = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.setItem('token', '')
        router.push('/auth')
    }
    return (
        <div className='flex-1 flex justify-between items-center'>
            <div></div>
            {
                router.pathname !== '/auth' && <PrimaryButton passedClassName='w-[120px] h-[32px] bg-[#1f1f1f]  rounded-lg' style={{ backgroundColor: '#1f1f1f' }} onClick={logout}>Log out</PrimaryButton>
            }
        </div>
    )
}

export default Logout