import { dauth_registerEmail } from '@/services/http'
import { sleep } from '@/utils'
import { encrypt, hashAndEncrypt } from '@/utils/crypto'
import exchangeKey from '@/utils/exchangeKey'
import { useRequest } from 'ahooks'
import React, { useContext, useState } from 'react'
import CodeIn from '../CodeIn'
import { EStep } from '../Input/EmailInput'
import Logo from '../Logo'
import SignIn from '../Signin'

const AuthContainer = () => {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [emailStep, setEmailStep] = useState(0)
    const onEmailSubmit = async (email: string) => {
        try {
            setEmailStep(EStep.exchange)
            await sleep()
            const { session_id, shareKey } = await exchangeKey.exchange()
            setEmailStep(EStep.encrypt)
            await sleep()
            const cipher_email = await encrypt(email, shareKey)
            setEmailStep(EStep.hiding)
            await sleep()
            await dauth_registerEmail({ cipher_email, session_id })
            setEmailStep(EStep.success)
            await sleep(1.5)
            setEmail(email)
            setStep(1)
        } catch (error) {
            console.log(error)

        }
    }

    const { loading, run, refreshAsync } = useRequest(onEmailSubmit, {
        manual: true
    });


    return (
        <div className='bg-dark rounded-2xl xl:w-3/5 w-4/5 h-3/5 min-h-fit  flex flex-col justify-evenly items-center  p-12'>
            {
                step === 0 && <SignIn onSubmit={run} step={emailStep} />
            }
            {
                step === 1 && <CodeIn email={email} resend={refreshAsync} />

            }
            <div className='text-[#999AA0] text-xs text-center'>

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