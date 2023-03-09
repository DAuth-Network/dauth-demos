import React, { useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'

interface IEmailInput { }

const EmailInput = () => {
    const [email, setEmail] = useState('')
    const onSubmit = () => { }

    return (
        <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=' rounded-full w-full bg-[#262629] text-[#999AA0] outline-none h-14 px-6 mb-5' placeholder='Enter your email' />
            <PrimaryButton onClick={() => { }} >Continue</PrimaryButton></>
    )
}

export default EmailInput