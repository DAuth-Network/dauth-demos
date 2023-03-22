import React, { FC } from 'react'
import { IconBaseProps } from 'react-icons'
import { useGoogleLogin } from '@react-oauth/google';
import { exchangeKeyAndEncrypt } from '@/utils/crypto';
import { loginWithOauth } from '@/services/http';
import { TbRefresh } from "react-icons/tb"


interface IOAuthButton {
    icon: any
    isRefresh: boolean,

}
const GoogleOauth: FC<IOAuthButton> = ({ icon, isRefresh = false }) => {
    const onSuccess = async (res: any) => {
        console.log(res)
        const code = res.code
        try {
            const { session_id, cipher_code } = await exchangeKeyAndEncrypt(code)
            await loginWithOauth({ cipher_code: code!, session_id, oauth_type: 'google' })
        } catch (error) {
            console.log(error)

        }

    }
    // const onFailure = () => {
    //     console.log(erro)
    // }

    const login = useGoogleLogin({
        onSuccess,
        flow: 'auth-code',
        redirect_uri: "http://localhost:3000/oauth/google"
    });


    return (isRefresh ? <TbRefresh size={24} /> : <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' onClick={() => { login() }} >
        <div className='p-1 rounded-full bg-white mr-2'>{
            icon({ size: 16, color: '#1F1F1F' })
        }
        </div>
        Continue with &nbsp;<span className=' capitalize'>Google</span>
    </button>)
}

export default GoogleOauth