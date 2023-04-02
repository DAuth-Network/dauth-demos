import WalletProviderItem from '@/WalletProviderItem'
import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa'
import { MdOutlineLock } from 'react-icons/md'
import { ReactSVG } from 'react-svg'
import DAuthModal from '../components/Modal/DAuthModal'

const walletProviders = [
    {
        name: "particle",
        icon: '/particle.png',
        text: "Particle Network"
    },
    {
        name: "dauth",
        icon: '/auth-only.png',
        text: "Authentication only (No wallet)"
    },
    {
        name: "lit",
        icon: '/lit.png',
        text: "Lit Protocol (Coming soon)"
    }
]
const useWalletProviderModal = () => {
    const [modalShow, toggleModalShow] = useState(false)
    const closeModal = () => {
        toggleModalShow(false)
    }
    const showModal = () => {
        toggleModalShow(true)
    }
    const handleClick = () => { }

    const Modal = ({ onConfirm }: any) => <DAuthModal modalIsOpen={modalShow} closeModal={closeModal} onConfirm={onConfirm} >
        <div className='flex flex-col items-center'>

            <div className='text-lg text-center my-4'>
                Select a wallet provider to create your new wallet
            </div>
            <div className='w-full'>
                {
                    walletProviders.map((item) => (<WalletProviderItem name={item.name} icon={item.icon} text={item.text} onClick={handleClick} />))
                }
            </div>
        </div>

    </DAuthModal>
    return {
        Modal,
        closeModal,
        showModal,
        modalShow
    }
}

export default useWalletProviderModal