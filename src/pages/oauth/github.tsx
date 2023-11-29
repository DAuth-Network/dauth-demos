import {loginWithOauth} from '@/services/http';
import {encrypt, exchangeKeyAndEncrypt} from '@/utils/crypto';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {updateActivedItem, updateVerifyedData} from "@/store/verifiedSlice";
import {useAccount} from "wagmi";
import {githubOauth} from "@/services/dauth";

const Github = () => {
    const [code, setCode] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    async function githubLoginFlow(code: string) {
        const {session_id, cipher_code} = await exchangeKeyAndEncrypt(code)
        await loginWithOauth({cipher_code: code!, session_id, oauth_type: 'github'})
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            githubOauth(code, 'test').then((res: string) => {
                dispatch(updateVerifyedData(res))
            }).catch((error: any) => {
                console.log(error)
            }).finally(() => {
                router.push('/')
            });
        }
    }, [])


    return (
        <div className='text-red-900'>
            redirecting...
        </div>
    )
}

export default Github