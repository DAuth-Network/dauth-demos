import React, { useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import CodeIn from '../CodeIn'
import EmailInput from '../Input/EmailInput'
import Logo from '../Logo'
import SignIn from '../Signin'

const AuthContainer = () => {
    const [step, setStep] = useState(0)
    const onEmailSubmit = () => {
        setStep(1)
    }


    return (
        <div className='bg-dark rounded-2xl xl:w-2/5 w-4/5 h-3/5 min-h-fit  flex flex-col justify-evenly items-center  p-12'>
            {
                step === 0 && <SignIn onSubmit={onEmailSubmit} />
            }
            {
                step === 1 && <CodeIn email='' />

            }
            <div className='text-[#999AA0] text-xs text-center'>
                <div >
                    Powered by DAuth to ensure your information remains anonymous and secure.
                </div>
                <div className='flex-row flex justify-center items-center  mt-4'>
                    <Logo className='logo-gray' />
                    <div className='text-[#999AA0] text-xs'>
                        DAuth Network
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AuthContainer    