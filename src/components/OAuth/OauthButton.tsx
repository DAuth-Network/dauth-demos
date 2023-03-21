import { loginWithOauth } from '@/services/http'
import { githubLogin } from '@/services/http/oauth'
import { encrypt, exchnageKeyAndEncrypt } from '@/utils/crypto'
import exchangeKey from '@/utils/exchangeKey'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { IMediaItem } from '../Icons'
import GoogleOauth from './GoogleOauth'

interface IOAuthButton {
    item: IMediaItem
    ready: boolean
}

const OauthButton: FC<IOAuthButton> = ({ item, ready }) => {

    const router = useRouter()

    const onClick = () => {
        githubLogin()
    }
    const responseGoogle = (res: any) => {
        console.log(res)
    }




    return (
        <>
            {
                item.name === 'google' ? <GoogleOauth icon={item.icon} isRefresh={false}
                /> : <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ' disabled={!ready} onClick={onClick}>
                    <div className='p-1 rounded-full bg-white mr-2'>{
                        item.icon({ size: 16, color: '#1F1F1F' })
                    }
                    </div>
                    Continue with &nbsp;<span className=' capitalize'>{item.name}</span>
                </button>
            }
        </>
    )
}

export default OauthButton