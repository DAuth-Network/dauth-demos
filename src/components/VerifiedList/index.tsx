import { IProfileItem } from '@/services/http'
import { shorterString } from '@/utils'
import React, { FC } from 'react'
import { IoShieldOutline } from 'react-icons/io5'

import { IMediaItem, mediasIcons } from '../Icons'

const itemList = ['email', 'twitter', 'github', 'discord', 'google']
interface IVerifiedItem {
    item: IMediaItem,
    verified: boolean,
    profile: IProfileItem[]
}
const VerifiedItem: FC<IVerifiedItem> = ({ item, verified, profile }) => {
    const ready = item.name === 'email'
    const verifyData = profile.find((_item) => item.name === _item.auth_type.toLowerCase())

    return <div className={'w-full lg:border-2 border border-[#383838] flex flex-col p-6 rounded-lg bg-[#2B2B2B] mt-4 lg:mt-8'}>
        <div className='flex flex-row  items-center lg:mb-6 mb-2'>
            <div className='mr-4'>
                <div className='p-1 rounded-full bg-white'>{
                    item.icon({ size: 16, color: '#1F1F1F' })
                }
                </div>
            </div>
            <div className='lg:text-lg text-base font-semibold mr-4 capitalize'>
                {item.name}
            </div>
            {
                verified && ready && <div className='text-[#40AA84] bg-[#1D322A] border border-[#40AA84] lg:rounded-lg rounded px-2 lg:text-base text-sm'>
                    Verified
                </div>
            }
            {
                !ready && <div>
                    <div className='bg-[#383838] px-4 py-1 rounded-lg  lg:text-base text-sm'>
                        Coming soon
                    </div>
                </div>
            }
        </div>
        {
            verified ? <>
                <div className=' text-sm'>
                    {shorterString(verifyData?.auth_hash || '')}
                </div>
                <div className='text-[#40AA84] flex items-center  lg:text-base text-sm mt-1'>
                    {verified && <> <IoShieldOutline size={18} color={"#40AA84"}/> &nbsp; <span>Your {item.name} has been abstracted</span></>}
                </div>
            </> : <button className='w-[220px] text-sm text-[#fff] flex flex-row items-center bg-[#1d1d1d] p-2 rounded opacity-50 justify-center cursor-pointer disabled:cursor-not-allowed' disabled={!ready}>
                <div className='p-1 rounded-full bg-white mr-2'>{
                    item.icon({ size: 16, color: '#1F1F1F' })
                }
                </div>
                Continue with &nbsp;<span className=' capitalize'>{item.name}</span>
            </button>
        }

    </div>
}

interface IVerifiedList {
    verifiedList: string[],
    profile: IProfileItem[]
}
const VerifiedList: FC<IVerifiedList> = ({ verifiedList, profile }) => {
    return (
        <div className='lg:w-2/3  lg:h-auto '>
            <div className='text-white text-lg font-semibold'>
                Verify Accounts
            </div>
            <div className=' lg:h-auto h-[30vh] overflow-y-scroll bg-dark lg:bg-transparent px-4 lg:px-0 rounded-lg mt-4'>
                {
                    mediasIcons.map((item, index) => {
                        return <VerifiedItem key={item.name} item={item} verified={verifiedList.includes(item.name) } profile={profile}/>
                    })
                }
            </div>
        </div>
    )
}

export default VerifiedList