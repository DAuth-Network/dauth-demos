import { dauth_registerEmail } from '@/services/http'
import { encrypt, hashAndEncrypt } from '@/utils/crypto'
import exchangeKey from '@/utils/exchangeKey'
import { useRequest } from 'ahooks'
import React, { useContext, useState } from 'react'
import PrimaryButton from '../Button/PrimaryButton'
import CodeIn from '../CodeIn'
import EmailInput from '../Input/EmailInput'
import Logo from '../Logo'
import SignIn from '../Signin'

const AuthContainer = () => {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const onEmailSubmit = async (email: string) => {
        try {
            const { session_id, shareKey } = await exchangeKey.exchange()
            const cipher_email = await encrypt(email, shareKey)
            await dauth_registerEmail({ cipher_email, session_id })
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
                step === 0 && <SignIn onSubmit={run} />
            }
            {
                step === 1 && <CodeIn email={email} resend={refreshAsync} />

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