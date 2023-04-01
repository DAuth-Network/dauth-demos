import React, { FC, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { exchangeKeyAndEncrypt } from '@/utils/crypto';
import { loginWithOauth } from '@/services/http';
import RefreshButton from './RefreshButton';
import { useRouter } from 'next/router';


interface IOAuthButton {
    icon: any
    isRefresh: boolean,

}
const GoogleOauth: FC<IOAuthButton> = ({ icon, isRefresh = false }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSuccess = async (res: any) => {
        const code = res.code
        try {
            const { session_id, cipher_code } = await exchangeKeyAndEncrypt(code)
            await loginWithOauth({ cipher_code: code!, session_id, oauth_type: 'google' })
            router.reload()
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }

    }


    const login = useGoogleLogin({
        onSuccess,
        flow: 'auth-code',
        onNonOAuthError(nonOAuthError) {
            console.log("nonOAuthError")
            setLoading(false)
        },
    });
    const onClick = () => {
        login()
        setLoading(true)
    }


    return (isRefresh ? <RefreshButton onClick={onClick} loading={loading} /> : <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' onClick={onClick} >
        <div className='p-1 rounded-full bg-white mr-2'>{
            icon({ size: 16, color: '#1F1F1F' })
        }
        </div>
        Continue with &nbsp;<span className=' capitalize'>Google</span>
    </button>)
}

export default GoogleOauth