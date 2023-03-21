import { loginWithOauth } from '@/services/http';
import { encrypt, exchnageKeyAndEncrypt } from '@/utils/crypto';
import exchangeKey from '@/utils/exchangeKey';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const Github = () => {
    async function githubLoginFlow(code: string) {
        try {
            const { session_id, cipher_code } = await exchnageKeyAndEncrypt(code)
            await loginWithOauth({ cipher_code: cipher_code!, session_id, oauth_type: 'github' })
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)
        if (code) {
            githubLoginFlow(code).then(res => {
                console.log(res)
            })
        }

    }, [])


    return (
        <div>github</div>
    )
}

export default Github