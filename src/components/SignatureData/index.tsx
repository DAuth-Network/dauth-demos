import React, { FC, useState } from 'react'
import { ImUser } from 'react-icons/im'
import { FaUserAlt } from 'react-icons/fa'
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
            <div className='flex flex-row-reverse lg:py-10 '>
                <div className={`py-0.5 px-1  bg-[#1f1f1f] inline-flex justify-between   rounded-full  `}>
                    <button disabled className={`mr-2 w-6 h-6 rounded-full cursor-not-allowed px-1`} onClick={onClick}>
                        {
                            !showAll ?
                                <ImUser color={'#9352FF'} className={`${!showAll ? 'visible' : 'hidden'}`} size={18} />
                                : <div className='w-5 h-5 bg-white rounded-full'>
                                </div>
                        }
                    </button>
                    <button disabled className={` rounded-full cursor-not-allowed`} onClick={onClick}>
                        {
                            showAll ?
                                <FaUserAlt color={'#9352FF'} size={18} /> : <div className='w-5 h-5   bg-white rounded-full'>
                                </div>
                        }

                    </button>
                </div>

            </div>
            <div className='lg:p-20 lg:h-full bg-[#1f1f1f]  rounded-lg '>
                {
                    <JsonItem item={data} />
                }
            </div>

        </div>
    )
}

export default SignatureData