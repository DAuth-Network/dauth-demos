import { loginWithOauth } from '@/services/http';
import { encrypt, exchangeKeyAndEncrypt } from '@/utils/crypto';
import exchangeKey from '@/utils/exchangeKey';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const Github = () => {
    const [code, setCode] = useState('')
    const router = useRouter()
    async function githubLoginFlow(code: string) {
        const { session_id, cipher_code } = await exchangeKeyAndEncrypt(code)
        await loginWithOauth({ cipher_code: code!, session_id, oauth_type: 'github' })
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            githubLoginFlow(code).then(res => {

            }).catch(() => {

            }).finally(() => {
                router.push('/')
            })
        }
    }, [])


    return (
        <div className='text-red-900'>
            redirecting...
        </div>
    )
}

export default Github