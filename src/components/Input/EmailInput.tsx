import React, { FC, useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import  { EStep } from '../StepLoading'
import { isEmail } from '@/utils'




interface IEmailInput {
    onSubmit: (email: string) => void,
    step: EStep,
    show: boolean
}
const EmailInput: FC<IEmailInput> = ({ onSubmit, step, show }) => {
    const [email, setEmail] = useState('')
    const disabled = step > EStep.default
    const handleSubmit = () => {
        isEmail(email) && onSubmit(email)
    }
    return (
        <>
            <div>
                <input type={show ? 'text' : 'password'} value={email} disabled={disabled} onChange={(e) => setEmail(e.target.value)} className={` rounded-full w-full bg-[#262629] text-[#999AA0] outline-none h-14 px-6 mb-5 disabled:cursor-not-allowed disabled:opacity-50 text-sm lg:text-base`} placeholder='Enter your email' />
                <PrimaryButton disabled={disabled} passedClassName={`w-full text-sm lg:text-base`} onClick={handleSubmit} >Continue</PrimaryButton>
            </div>
        </>

    )
}

export default EmailInput