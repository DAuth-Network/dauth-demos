import React, { FC, useState } from 'react'
import AuthCode from 'react-auth-code-input';
import { FiMail } from 'react-icons/fi'
interface ICodeIn {
    email: string
}
const CodeIn: FC<ICodeIn> = ({ email }) => {
    const [result, setResult] = useState('');
    const handleOnChange = (res: string) => {
        setResult(res);
    };
    const resend = () => { }
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='rounded-3xl flex justify-center items-center mb-4' >
                <FiMail size={48} />
            </div>
            <div className='text-center'>
                <div className='text-xl font-semibold'>
                    Confirm verification code
                </div>
                <div className=' text-sm text-[#ffffff80]'>
                    We&apos;ve sent a code to
                </div>
                <div>
                    {email}
                </div>
            </div>
            <div className=' mt-10'>
                <AuthCode
                    allowedCharacters='numeric'
                    containerClassName='flex w-full justify-evenly'
                    inputClassName='w-10 h-10 mx-2 rounded-md outline-none text-center  bg-[#262629] text-white'
                    onChange={handleOnChange} />
                <div className='mt-10 text-center  text-sm'>
                    <span className='text-[#898989]'>Didn&apos;t receive it?</span>
                    <span className='text-main cursor-pointer' onClick={resend}>Resend</span>
                </div>
            </div>
        </div>
    )
}

export default CodeIn