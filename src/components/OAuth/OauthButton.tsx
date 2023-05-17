import useDauthModal from '@/hooks/useDauthModal'
import { loginWithOauth, verifyJwt } from '@/services/http'
import { githubLogin } from '@/services/http/oauth'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { AiFillFire } from 'react-icons/ai'
import { IMediaItem } from '../Icons'
import GoogleOauth from './GoogleOauth'
import RefreshButton from './RefreshButton'
import { loginWithPN } from '@/services/particle'
import DAuthModal from '../Modal/DAuthModal'
import { BeatLoader } from 'react-spinners'
interface IOAuthButton {
    item: IMediaItem
    ready: boolean,
    isRefresh?: boolean
}

const OauthButton: FC<IOAuthButton> = ({ item, ready, isRefresh = false }) => {
    const [loading, setLoading] = useState(false)
    const { showModal, Modal } = useDauthModal()
    const [modalShow, setModalShow] = useState(false)
    const [statues, setStatus] = useState(false)
    const [sig, setSig] = useState('')
    const closeModal = () => {
        setModalShow(false)
    }
    const onConfirm = async () => {
        try {
            setLoading(true)
            const jwt = localStorage.getItem('token')
            const res = await verifyJwt(jwt!)
            if (res.jwt_status.status === 'ok') {
                setStatus(true)
                setSig(res.sig)
            }
        } catch (error) {
            setStatus(false)
        } finally {
            setLoading(false)
            setModalShow(true)
        }

    }
    return (
        <>
            <DAuthModal modalIsOpen={modalShow} closeModal={closeModal} onConfirm={closeModal} >
                <div className='break-all'>
                    {
                        statues ?
                            <div className=' text-green-400 text-lg'>
                                Initial Lit Action succeed, JWT is valid.
                            </div>
                            :
                            <div className=' text-red-400 text-lg'>
                                Initial Lit Action error, JWT is invalid,  please try again.
                            </div>
                    }
                    <div>
                        Signature:
                    </div>
                    {sig}
                </div>
            </DAuthModal>
            <button disabled={loading} className=' bg-[#d6a783] py-2 rounded-md flex justify-center items-center' onClick={onConfirm}>
                {loading ? <BeatLoader color="#fff" />
                    :
                    <>
                        <AiFillFire size={24} /> &nbsp; initial Lit Action

                    </>}


            </button>
        </>
    )
}

export default OauthButton