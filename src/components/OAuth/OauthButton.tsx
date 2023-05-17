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
            setSig('')
            const jwt = localStorage.getItem('token')
            const res = await verifyJwt(jwt!)
            if (res.jwt_status.status === 'ok') {
                setStatus(true)
                setSig(res.sig)
            }
        } catch (error) {
            setStatus(false)
            setSig('')
        } finally {
            setLoading(false)
            setModalShow(true)
        }

    }
    return (
        <>
            <DAuthModal modalIsOpen={modalShow} closeModal={closeModal} onConfirm={closeModal} >
                <div className=' break-all break-inside-avoid'>
                    {
                        statues ?
                            <div className=' text-green-400 text-lg'>
                                The JWT is authenticated through Lit Action. JWT is valid.
                            </div>
                            :
                            <div className=' text-red-400 text-lg'>
                                The JWT is authenticated through Lit Action. JWT is invalid. please try again.
                            </div>
                    }
                    <br />
                    <div>
                        <div>Signed Message: `Hello Lit Protocol`</div>
                        <br />
                        <div>PKP Public Key: `0x04e1e6e0d77dcdd5724ee860a2177476b5975c5ecfa9d19d9c6d77605f3d03c97540146367627bd8bce5e7dc7c0cddf0a60ffb9fb7758da740d26867cd50ed84e0`</div>
                        <br />
                        PKP signature:
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