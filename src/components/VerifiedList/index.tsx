import { IProfileItem } from '@/services/http'
import React, { FC, useState } from 'react'

import { mediasIcons } from '../Icons'
import VerifiedItem from './VerifiedItem'
import { BsTwitter } from 'react-icons/bs'


interface IVerifiedList {
    verifiedList: string[],
    profile: IProfileItem[]
}
const VerifiedList: FC<IVerifiedList> = ({ verifiedList, profile }) => {
      const [isFollowed, setIsFollowed] = useState(false);
      const handleFollow = () => {
        setTimeout(() => {
          setIsFollowed(true);
        }, 5000);
      };
    return (
        <div className='lg:w-2/3  lg:h-auto '>
            <div className="mt-2">
                <div className="text-white text-lg font-semibold mb-4">step 01</div>
                <a href="https://twitter.com/openid_3" target="_blank" rel="noopener noreferrer">
                    <button style={{ width: '14.5rem' }} onClick={handleFollow} className="bg-[#3574f4] font-light text-dark text-xs rounded-lg p-2 my-1">
                        <div className="flex items-center justify-center text-md font-bold text-white ">
                            <span className="mr-2"><BsTwitter /></span>
                            Follow Us
                        </div>
                    </button>
                </a>
                { isFollowed && <p className="text-white text-xs">Thank you for following us.</p>}

            </div>

            <div className=' lg:h-auto h-[30vh] overflow-y-scroll bg-dark lg:bg-transparent px-4 lg:px-0 rounded-lg mt-4'>
            <p className="text-white text-lg font-semibold">step 02</p>

                {
                    mediasIcons.map((item, index) => {
                        return <VerifiedItem key={item.name} item={item} verified={verifiedList.includes(item.name)} profile={profile} disabled={!isFollowed} />
                    })
                }
            </div>
        </div>
    )
}

export default VerifiedList