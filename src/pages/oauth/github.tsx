import { loginWithOauth } from '@/services/http';
import { encrypt, exchangeKeyAndEncrypt } from '@/utils/crypto';
import exchangeKey from '@/utils/exchangeKey';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const Github = () => {
    const [code, setCode] = useState('')
    async function githubLoginFlow(code: string) {
        try {
            const { session_id, cipher_code } = await exchangeKeyAndEncrypt(code)
            await loginWithOauth({ cipher_code: code!, session_id, oauth_type: 'github' })
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)
        setCode(code!)
    }, [])


    return (
        <div className='text-red-900'>
            github
            <button onClick={() => {githubLoginFlow(code)}}>请求</button>

        </div>
    )
}

export default Github