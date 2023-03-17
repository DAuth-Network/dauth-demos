import { motion } from 'framer-motion'
import React, { FC } from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { CgSpinnerAlt } from 'react-icons/cg'
export enum EStep {
    default,
    exchange,
    encrypt,
    hiding,
    success,
}
interface IStepLoading {
    step: EStep,
    toggleShow: (show: boolean) => void
    show: boolean
}
const StepLoading: FC<IStepLoading> = ({ step, show, toggleShow }) => {

    return (
        <div className='flex-1 mt-4 text-xs justify-center flex items-center h-6'>
            {
                step === EStep.default && <>
                    <button className='cursor-pointer' onClick={() => {toggleShow(!show)}}>
                        {
                            show ? <FaEye  size={24} color={'#833cf8'} /> : <FaEyeSlash size={24} color={'#833cf8'} />
                        }
                    </button>

                    <div className='w-4/5 ml-2 text-[#A1A1A1] text-sm lg:text-base'>
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
                    <CgSpinnerAlt color={"#833cf8"} size={24} />
                </motion.div>

                    <div className='w-4/5 ml-2 text-[#A1A1A1] text-sm lg:text-base'>
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
                    <CgSpinnerAlt color={"#833cf8"} size={24} />
                </motion.div>

                    <div className='w-4/5 ml-2 text-[#A1A1A1] text-sm lg:text-base'>
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
                    <CgSpinnerAlt color={"#833cf8"} size={24} />
                </motion.div>

                    <div className='w-4/5 ml-2 text-[#A1A1A1] text-sm lg:text-base'>
                        Hiding your identity.
                    </div></>
            }
            {
                step === EStep.success && <>
                    <FiCheck color={"#40AA84"} size={24} />

                    <div className='w-4/5 ml-2 text-[#40AA84] text-sm lg:text-base'>
                        Succeeded!
                    </div></>
            }
        </div>
    )
}

export default StepLoading