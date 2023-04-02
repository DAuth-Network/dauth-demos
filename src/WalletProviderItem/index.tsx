import React, { FC } from 'react'


interface IWalletProviderItem {
    name: string
    icon: string,
    text: string,
    onClick: () => void
}
const WalletProviderItem: FC<IWalletProviderItem> = ({ icon, name, text }) => {

    return <button disabled={name=== 'lit'} className='w-full my-4 border-2 rounded-xl flex flex-row items-center py-4 pl-6 opacity-60 cursor-pointer hover:opacity-100'>
        <img src={icon} className='w-8' />
        <div className='pl-6 font-medium text-left'>
            {text}
        </div>
    </button>
}

export default WalletProviderItem