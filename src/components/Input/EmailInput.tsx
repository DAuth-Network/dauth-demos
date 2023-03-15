import React, { FC, useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import { FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { ImSpinner } from 'react-icons/im'
import { FiCheck } from 'react-icons/fi'


export enum EStep {
    default,
    exchange,
    encrypt,
    hiding,
    success,
}
interface IEmailInput {
    onSubmit: (email: string) => void,
    step: EStep
}
const EmailInput: FC<IEmailInput> = ({ onSubmit, step }) => {
    const [email, setEmail] = useState('')
    return (
        <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=' rounded-full w-full bg-[#262629] text-[#999AA0] outline-none h-14 px-6 mb-5' placeholder='Enter your email' />
            <PrimaryButton passedClassName='w-full' onClick={() => { onSubmit(email) }} >Continue</PrimaryButton>
            <div className='flex-1 mt-4 text-xs justify-center flex items-center'>
                {
                    step === EStep.default && <><FaEyeSlash size={24} color={'#833cf8'} />

                        <div className='w-4/5 ml-2 text-[#A1A1A1]'>
                            Implemented with DAuth. None of your data will be revealed.
                        </div></>
                }
                {
                    step === EStep.exchange && <> <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ImSpinner color={"#1B59EF"} size={24} />
                    </motion.div>

                        <div className='w-4/5 ml-2 text-[#A1A1A1]'>
                            Establishing a secure connection with DAuth node
                        </div></>
                }
                {
                    step === EStep.encrypt && <> <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ImSpinner color={"#1B59EF"} size={24} />
                    </motion.div>

                        <div className='w-4/5 ml-2 text-[#A1A1A1]'>
                            Encrypting your email.
                        </div></>
                }
                {
                    step === EStep.hiding && <> <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ImSpinner color={"#1B59EF"} size={24} />
                    </motion.div>

                        <div className='w-4/5 ml-2 text-[#A1A1A1]'>
                            Hiding your identity.
                        </div></>
                }
                {
                    step === EStep.success && <>
                        <FiCheck color={"#1B59EF"} size={24} />

                        <div className='w-4/5 ml-2 text-[#A1A1A1]'>
                            Succeeded!
                        </div></>
                }
            </div>

        </>

    )
}

export default EmailInput