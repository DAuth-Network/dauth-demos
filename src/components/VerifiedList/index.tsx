import { IProfileItem } from '@/services/http'
import React, { FC } from 'react'

import { mediasIcons } from '../Icons'
import VerifiedItem from './VerifiedItem'


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
                        return <VerifiedItem key={item.name} item={item} verified={verifiedList.includes(item.name) } profile={profile} active/>
                    })
                }
            </div>
        </div>
    )
}

export default VerifiedList