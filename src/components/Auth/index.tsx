import { dauth_registerEmail } from '@/services/http'
import { sleep } from '@/utils'
import { encrypt, hashAndEncrypt } from '@/utils/crypto'
import exchangeKey from '@/utils/exchangeKey'
import { useRequest } from 'ahooks'
import React, { useContext, useState } from 'react'
import CodeIn from '../CodeIn'
import Logo from '../Logo'
import SignIn from '../Signin'
import StepLoading, { EStep } from '../StepLoading'

const AuthContainer = () => {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [loadingStep, setLoadingStep] = useState(0)
    const [show, setShow] = useState(true)
    const onEmailSubmit = async (email: string) => {
        try {
            setLoadingStep(EStep.exchange)
            await sleep()
            const { session_id, shareKey } = await exchangeKey.exchange()
            setLoadingStep(EStep.encrypt)
            await sleep()
            const cipher_email = await encrypt(email, shareKey)
            setLoadingStep(EStep.hiding)
            setShow(false)

            await sleep()
            await dauth_registerEmail({ cipher_email, session_id })
            setLoadingStep(EStep.success)
            await sleep(1.5)
            setEmail(email)
            setStep(1)
            setLoadingStep(EStep.default)
        } catch (error) {
            console.log(error)

        }
    }

    const { loading, run, refreshAsync } = useRequest(onEmailSubmit, {
        manual: true
    });


    return (
        <div className='bg-dark rounded-2xl 2xl:w-3/5 w-4/5 h-3/5 min-h-fit  flex flex-col  items-center justify-around p-10 px-20'>
            <div className='w-full'>
                {
                    step === 0 && <SignIn show={show} onSubmit={run} step={loadingStep} />
                }
                {
                    step === 1 && <CodeIn show={show} email={email} resend={refreshAsync} />

                }
                <div className='mt-6 flex-none'>
                    <StepLoading show={show} step={loadingStep} toggleShow={setShow} />
                </div>

            </div>

            <div className='text-[#999AA0] text-xs '>
                <div className='flex-row flex justify-center items-center  mt-4 text-center'>
                    <div>Secured by</div>
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