import AuthContainer from '@/components/Auth'
import { enqueueSnackbar } from 'notistack'
import React from 'react'

const Auth = () => {
    return (
        <div className='w-100 h-screen flex-row flex'>
            <div className='w-1/2 h-full flex justify-center items-center bg-dark'>
                    <div className='text-5xl  font-semibold mb-5'>
                <div className='w-[462px]'>
                        Privacy-Preserving Authentication
                    </div>
                    <div className='font-gray-400 text-base text-gray-500'>
                        Get started with the DAuth demo by entering your email address
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-full bg-liner flex justify-center items-center'>
                <AuthContainer />
            </div>

        </div>
    )
}

export default Auth