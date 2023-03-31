import React, { useState } from 'react'
import DAuthModal from '../components/Modal/DAuthModal'

const useModal= () => {
    const [modalShow, toggleModalShow] = useState(true)
    const closeModal = () => {
        toggleModalShow(false)
    }
    const showModal = () => {
        toggleModalShow(true)
    }
    console.log(modalShow, "modalShow")

    const Modal = ({children, onConfirm}: any) => <DAuthModal modalIsOpen={modalShow} closeModal={closeModal} onConfirm={onConfirm} >{children}</DAuthModal>
    return {
        Modal,
        closeModal,
        showModal
    }
}

export default useModal