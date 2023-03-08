import React from 'react'
import Logo from '../Logo'

const AuthContainer = () => {
    return (
        <div className='bg-dark rounded-2xl w-1/2 h-4/6 flex justify-center  p-10'>
            <div className='w-20 h-20 rounded-3xl flex justify-center items-center' style={{
                backgroundColor: `rgb(249,87,251)`,
                background: `linear-gradient(129deg, rgba(249,87,251,1) 0%, rgba(11,8,41,1) 80%)`
            }}>
                <Logo />
            </div>
            <div className='text-3xl font-semibold'>
                Sign in / Sign up
            </div>
        </div>
    )
}

export default AuthContainer