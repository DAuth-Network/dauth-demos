import React, { FC } from 'react'
import { ReactSVG } from 'react-svg'
import EmailInput from '../Input/EmailInput'
import Logo from '../Logo'
import { EStep } from '../StepLoading'

interface ISignIn {
    onSubmit: (email: string) => void
    step: EStep,
    show: boolean
}
const SignIn: FC<ISignIn> = ({ onSubmit, step, show }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='rounded-3xl flex justify-center items-center mb-4' style={{
                }}>
                    <ReactSVG src="/logo-2.svg" className={'w-full'} width={80} />
                </div>
                <div className='text-3xl font-semibold mb-6'>
                    Sign in / Sign up
                </div>
            </div>
            <div>
                <EmailInput show={show} onSubmit={onSubmit} step={step}  />
            </div>

        </>
    )
}

export default SignIn