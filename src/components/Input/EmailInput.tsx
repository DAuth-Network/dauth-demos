import React, { FC, useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'

interface IEmailInput {
    onSubmit: (email: string) => void
}

const EmailInput:FC<IEmailInput> = ({ onSubmit }) => {
    const [email, setEmail] = useState('')

    return (
        <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=' rounded-full w-full bg-[#262629] text-[#999AA0] outline-none h-14 px-6 mb-5' placeholder='Enter your email' />
            <PrimaryButton onClick={() => {onSubmit(email)}} >Continue</PrimaryButton></>
    )
}

export default EmailInput