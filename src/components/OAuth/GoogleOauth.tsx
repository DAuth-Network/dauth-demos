import React, {FC, useState} from 'react'
import {useGoogleLogin} from '@react-oauth/google';
import {exchangeKeyAndEncrypt} from '@/utils/crypto';
import {loginWithOauth} from '@/services/http';
import RefreshButton from './RefreshButton';
import {useRouter} from 'next/router';
import {googleOauth} from "@/services/dauth";
import {useAccount} from "wagmi";
import {useDispatch} from "react-redux";
import {updateVerifyedData} from "@/store/verifiedSlice";


interface IOAuthButton {
    icon: any
    isRefresh: boolean,

}

const GoogleOauth: FC<IOAuthButton> = ({icon, isRefresh = false}) => {
    const {address} = useAccount()
    const [loading, setLoading] = useState(false)
    const account = useAccount()
    const router = useRouter()
    const dispatch = useDispatch()
    const onSuccess = async (res: any) => {
        console.log(res, 'google')
        const code = res.code
        googleOauth(code, address!)
            .then((res: any) => {
                console.log(res)
                dispatch(updateVerifyedData(res))
            }).catch((e: Error) => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })

    }


    const login = useGoogleLogin({
        onSuccess,
        flow: 'auth-code',
        redirect_uri: "http://localhost:3000",
        onNonOAuthError(nonOAuthError) {
            console.log("nonOAuthError")
            setLoiadng(false)
        },
    });
    const onClick = () => {
        login()

        setLoading(true)
    }


    return (isRefresh ? <RefreshButton onClick={onClick} loading={loading}/> : <button
        className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 '
        onClick={onClick}>
        <div className='p-1 rounded-full bg-white mr-2'>{
            icon({size: 16, color: '#1F1F1F'})
        }
        </div>
        Continue with &nbsp;<span className=' capitalize'>Google</span>
    </button>)
}

export default GoogleOauth