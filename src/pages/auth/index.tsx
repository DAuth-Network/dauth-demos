import AuthContainer from '@/components/Auth'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Header from '@/components/Layout/Header'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'

const Auth = () => {
    const [modalShow, setModalShow] = useState(false)
    const showModal = () => {
        setModalShow(true)
    }
    return (
        <div className='h-screen flex-row flex   bg-black'>
            <div className='absolute '>
                <Header />
            </div>

            <div className='lg:w-1/2 w-full h-full flex justify-center items-center px-10 lg:px-0'>
                <div className='font-semibold mb-5'>
                    <div className='lg:w-[462px]  text-4xl lg:text-5xl '>
                        Privacy-Preserving Authentication
                    </div>
                    <div className='font-gray-400 text-lg text-gray-500 mt-5 font-medium'>
                        Get started with the DAuth demo by entering your email address
                    </div>
                    <div className='lg:hidden px-2 mt-6'>
                        <PrimaryButton onClick={showModal} passedClassName={'w-full'}>Try Demo</PrimaryButton>
                    </div>
                </div>
            </div>
            <div className='w-1/2 hidden h-full bg-liner lg:flex justify-center items-center'>
                <AuthContainer />
            </div>
            {
                modalShow && <div className='lg:hidden w-full fixed bg-[#000000B2] h-screen z-30' onClick={() => {setModalShow(false)}}>
                    <div className='absolute bottom-0 w-full' onClick={e => e.stopPropagation()}>
                        <AuthContainer />
                    </div>
                </div>
            }

        </div>
    )
}

export default Auth