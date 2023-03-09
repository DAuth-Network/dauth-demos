import React, { FC } from 'react'
import EmailInput from '../Input/EmailInput'
import Logo from '../Logo'

interface ISignIn {
    onSubmit: () => void
}
const SignIn:FC<ISignIn> = ({onSubmit}) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-20 h-20 rounded-3xl flex justify-center items-center mb-4' style={{
                    backgroundColor: `rgb(249,87,251)`,
                    background: `linear-gradient(129deg, rgba(249,87,251,1) 0%, rgba(11,8,41,1) 80%)`
                }}>
                    <Logo />
                </div>
                <div className='text-3xl font-semibold'>
                    Sign in / Sign up
                </div>
            </div>
            <div>
                <EmailInput />
            </div>

        </>
    )
}

export default SignIn