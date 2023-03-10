import { dauth_registerEmail } from '@/services/http';
import { hashAndEncrypt } from '@/utils/crypto';
import exchangeKey from '@/utils/exchangeKey';
import { useCountDown, useRequest } from 'ahooks';
import React, { FC, useEffect, useRef, useState } from 'react'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import { FiMail } from 'react-icons/fi'
import { motion } from "framer-motion"
import { ImSpinner } from "react-icons/im"

interface ICodeIn {
    email: string,
    resend: () => Promise<void>
}
const coldDown = 60 * 1000
enum Estep {
    failed = -1,
    ready,
    success,
}
const inputClasses: any = {
    [Estep.success]: "bg-[#1d322a] text-[#40aa84] border-[#40aa84]",
    [Estep.failed]: "bg-[#3f292c] text-[#EE736F] border-[#EE736F]",
    [Estep.ready]: " bg-[#262629] text-white border-[#383838]",
}
const CodeIn: FC<ICodeIn> = ({ email, resend }) => {
    const AuthInputRef = useRef<AuthCodeRef>(null);

    const [code, setResult] = useState('');
    const [targetDate, setTargetDate] = useState(Date.now() + coldDown)
    const [resendShow, setResendShow] = useState(false)
    const [status, setStatus] = useState(Estep.ready)
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (res: string) => {
        setStatus(Estep.ready)

        setResult(res);
    };
    const [, formattedRes] = useCountDown(
        {
            targetDate,
            onEnd: () => { setResendShow(true) }
        }
    );
    const onResend = async () => {
        setResendShow(false)
        AuthInputRef.current?.clear()
        AuthInputRef.current?.focus()
        setStatus(Estep.ready)
        setTargetDate(Date.now() + coldDown)
        await resend()
    }
    const submitCode = async () => {
        try {
            setIsLoading(true)
            const { session_id, shareKey } = await exchangeKey.exchange()
            const cipher_email = await hashAndEncrypt(code, shareKey)
            await dauth_registerEmail({ cipher_email, session_id })
            setIsLoading(false)
            setStatus(Estep.success)
        } catch (error) {
            setIsLoading(false)
            setStatus(Estep.failed)
        }
    }
    const {run} = useRequest(submitCode, {
        ready: code.length === 6,
        debounceWait: 200,
    });

    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='rounded-3xl flex justify-center items-center mb-4' >
                <FiMail size={54} />
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
            <div className='mt-6'>
                {
                    isLoading && <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ImSpinner color={"#1B59EF"} size={40} />
                    </motion.div>
                }
                <div className={`${isLoading ? 'hidden' : 'block'}`}>
                    <AuthCode
                        ref={AuthInputRef}

                        allowedCharacters='numeric'
                        containerClassName='flex w-full justify-evenly'
                        inputClassName={`w-12 h-12 mx-2 rounded-xl outline-none text-center border  text-[22px] ${inputClasses[status]}`}
                        onChange={handleOnChange} />
                    <div className='mt-10 text-center  text-sm font-semibold'>
                        {
                            status === Estep.ready && <>
                                <span className='text-[#898989] inline-block mr-1'>Didn&apos;t receive it?</span>
                                {
                                    resendShow ? <span className='text-main cursor-pointer' onClick={onResend}>Resend</span> : <span className='text-main'>{formattedRes.seconds}s</span>
                                }
                            </>
                        }
                        {
                            status === Estep.success && <span className='text-[#40AA84] inline-block mr-1'>Wecome! <span className='text-xl'>🎉</span></span>
                        }
                        {
                            status === Estep.failed && <div>
                                <div className='text-[#CB6462] inline-block mr-1'>Incorrect code. Please try again.</div>
                                <div>
                                    <span className='text-[#898989] inline-block mr-1'>Didn&apos;t receive it?</span>
                                    {
                                        resendShow ? <span className='text-main cursor-pointer' onClick={onResend}>Resend</span> : <span className='text-main'>{formattedRes.seconds}s</span>
                                    }
                                </div>

                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeIn