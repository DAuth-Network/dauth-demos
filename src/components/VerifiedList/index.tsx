import React, { FC } from 'react'
import { icons } from 'react-icons'
import { IMediaItem, mediasIcons } from '../Icons'

const list = [
    {
        item: "email",
        verified: false,
        value: '8743b52063cd84097a65d1633f5c74f5'
    }
]
const itemList = ['email', 'twitter', 'github', 'discord', 'google']
interface IVerifiedItem {
    item: IMediaItem,
    verified?: boolean,
}
const VerifiedItem: FC<IVerifiedItem> = ({ item, verified }) => {
    const ready = item.name === 'email'
    return <div className={'w-full border-2 border-[#383838] flex flex-col p-6 rounded-lg bg-[#2B2B2B] mt-8'}>
        <div className='flex flex-row  items-center mb-6'>
            <div className='mr-4'>
                {
                    item.icon({ size: 20, color: '#fff' })
                }
            </div>
            <div className='text-lg font-semibold mr-4 capitalize'>
                {item.name}
            </div>
            {
                verified && ready &&  <div className='text-[#40AA84] bg-[#1D322A] border border-[#40AA84] rounded-lg px-2 text-base'>
                    Verified
                </div>
            }
            {
                !ready && <div>
                    <div className='bg-[#383838] px-6 py-1 rounded-lg'>
                        Coming soon
                    </div>
                </div>
            }
        </div>
        {
            verified ? <>
                <div className='text-sm'>
                    8743b52063cd84097a65d1633f5c74f5
                </div>
                <div className='text-[#40AA84]'>
                    verified &&<span></span>
                </div>
            </> : <button className='w-[220px] text-sm text-[#fff] flex flex-row bg-[#1d1d1d] p-2 rounded opacity-50 justify-center cursor-pointer hover:opacity-100' disabled={!ready}>
                <div className='mr-2'>
                    <item.icon size={20} color={"#fff"} />
                </div>
                Continue with &nbsp;<span className=' capitalize'>{item.name}</span>
            </button>
        }

    </div>
}
const VerifiedList = () => {
    return (
        <div className='w-2/3'>
            <div className='text-white text-lg'>
                Verify Accounts
            </div>
            <div className=''>
                {
                    mediasIcons.map((item, index) => {
                        return <VerifiedItem key={item.name} item={item} />
                    })
                }
            </div>
        </div>
    )
}

export default VerifiedList