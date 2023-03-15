import React, { FC, useState } from 'react'
import { ImUser } from 'react-icons/im'
import { RiHistoryFill } from 'react-icons/ri'
import ReactJson from 'react-json-view'
import JsonItem from '../JsonItem'

interface ISignatureData {
    data: any
}
const SignatureData:FC<ISignatureData> = ({data}) => {
    const [showAll, setShowAll] = useState(false)
    const onClick = () => {
        setShowAll(!showAll)
    }
    return (
        <div className=''>
            <div className='flex flex-row-reverse py-20'>
                <div className={`py-0.5 px-2  bg-[#000] inline-flex justify-between   rounded-full  `}>
                    <button className={`mr-4 w-7 h-7 rounded-full`} onClick={onClick}>
                        {
                            !showAll ?
                                <ImUser color={'#9352FF'} className={`${!showAll ? 'visible' : 'hidden'}`} size={24} />
                                : <div className='w-6 h-6 bg-white rounded-full'>
                                </div>
                        }
                    </button>
                    <button className={` rounded-full`} onClick={onClick}>
                        {
                            showAll ?
                                <RiHistoryFill color={'#9352FF'} size={24} /> : <div className='w-6 h-6   bg-white rounded-full'>
                                </div>
                        }

                    </button>
                </div>

            </div>
            <div className='p-20 h-full bg-[#1f1f1f] rounded-lg'>
                {
                    <JsonItem item={data} />
                }
            </div>

        </div>
    )
}

export default SignatureData