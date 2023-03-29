import PrimaryButton from '@/components/Button/PrimaryButton';
import React, { FC, ReactNode } from 'react'
import Modal from 'react-modal';

interface IDAuthModal {
    modalIsOpen: boolean,
    children: ReactNode
    closeModal: () => void

}
const DAuthModal: FC<IDAuthModal> = ({ modalIsOpen, children, closeModal }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            shouldCloseOnEsc
            shouldFocusAfterRender
            shouldCloseOnOverlayClick
            onRequestClose={closeModal}
        >
            {children}
            <PrimaryButton onClick={closeModal}>
                Continue
            </PrimaryButton>
        </Modal>
    )
}

export default DAuthModal