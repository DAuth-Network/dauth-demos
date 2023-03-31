import PrimaryButton from '@/components/Button/PrimaryButton';
import Logo from '@/components/Logo';
import React, { FC, ReactNode } from 'react'

interface IDAuthModal {
    modalIsOpen: boolean,
    closeModal: () => void
    onConfirm: () => void
    children: ReactNode
}

const DAuthModal: FC<IDAuthModal> = ({ modalIsOpen, children, closeModal, onConfirm }) => {
    const handleConfirm = () => {
        closeModal()
        onConfirm!()
    }
    return (
        <div className={`main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden  justify-center items-center animated fadeIn faster ${modalIsOpen ? 'flex' : 'hidden'}`}
            style={{ background: "rgba(0,0,0,.7)" }}>
            <div
                className="shadow-lg modal-container bg-black w-11/12 md:max-w-md mx-auto rounded-lg  z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <div className="text-2xl flex justify-center items-center w-full">
                            <Logo className='fill-current text-white logo-white' />
                            <div className='text-xs'>
                                DAuth Network
                            </div>
                        </div>
                        <div className="modal-close cursor-pointer z-50">
                            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="my-5 text-red-200">
                        {children}
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300" onClick={handleConfirm}>Continue</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DAuthModal