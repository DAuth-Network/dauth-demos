import useDauthModal from '@/hooks/useDauthModal'
import { loginWithOauth } from '@/services/http'
import { githubLogin } from '@/services/http/oauth'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { TbRefresh } from 'react-icons/tb'
import { IMediaItem } from '../Icons'
import GoogleOauth from './GoogleOauth'
import RefreshButton from './RefreshButton'
import { loginWithPN } from '@/services/particle'
interface IOAuthButton {
    item: IMediaItem
    ready: boolean,
    isRefresh?: boolean
}

const OauthButton: FC<IOAuthButton> = ({ item, ready, isRefresh = false }) => {
    const [loading, setLoading] = useState(false)
    const { showModal, Modal } = useDauthModal()
    const onClick = () => {
        setLoading(true)
        githubLogin()
    }
    const onConfirm = async () => {
        const jwt = localStorage.getItem('token')
        if (jwt) {
            const res = await loginWithPN(jwt!)
            console.log(res)
        }

    }
    return (
        <>
            <Modal onConfirm={onClick} />
            {
                item.name === 'google' ? <GoogleOauth icon={item.icon} isRefresh={isRefresh}
                /> : <div>
                    {/* {

                        isRefresh ? <RefreshButton loading={loading} onClick={onClick} /> : <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] 
                    p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 '
                            disabled={!ready}
                            onClick={showModal}
                        >
                            <div className='p-1 rounded-full bg-white mr-2'>{
                                item.icon({ size: 16, color: '#1F1F1F' })
                            }
                            </div>
                            Continue with &nbsp;<span className=' capitalize'>{item.name}</span>
                        </button>

                    } */
                        <button onClick={onConfirm} className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] 
                        p-2 rounded justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'> + Add Wallet Provider</button>
                    }
                </div>
            }
        </>
    )
}

export default OauthButton