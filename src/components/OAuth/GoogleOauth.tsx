import React, { FC } from 'react'
import GoogleLogin, { useGoogleLogin } from 'react-google-login'
import { IconBaseProps } from 'react-icons'


interface IOAuthButton {
    icon: any
    isRefresh: boolean,

}
const GoogleOauth: FC<IOAuthButton> = ({ icon, isRefresh = false }) => {
    const clientId = '821654150370-2u0uuri792d2biq0t8uf42fs9ubsf7t2.apps.googleusercontent.com'
    const onSuccess = (res: any) => {
        console.log(res)
    }
    const onFailure = (erro: any) => {
        console.log(erro)
    }

    const { signIn, loaded } = useGoogleLogin({
        onSuccess,
        clientId,
        onFailure,
        redirectUri: 'http://locahost:3000'
    })

    return (
        <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' onClick={signIn} >
            <div className='p-1 rounded-full bg-white mr-2'>{
                icon({ size: 16, color: '#1F1F1F' })
            }
            </div>
            Continue with &nbsp;<span className=' capitalize'>Google</span>
        </button>
    )
}

export default GoogleOauth