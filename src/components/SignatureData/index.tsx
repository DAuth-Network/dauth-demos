import React, { useState } from 'react'
import { ImUser } from 'react-icons/im'
import { RiHistoryFill } from 'react-icons/ri'
import ReactJson from 'react-json-view'
import JsonItem from '../JsonItem'

const SignatureData = () => {
    const [showAll, setShowAll] = useState(false)
    const onClick = () => {
        setShowAll(!showAll)
    }
    const datas = [
        {
            "Nounce": "0", "environmentId": "fba5127c-21c0-430e-bb03-7dc8f6b11397", "sessionId": "44263fe7-2994-45b1-9676-39f7b8d5fa94", "userId": "ddf8846b-890d-4dfb-badf-2250444676b0", "verifiedCredentials": [{ "email": "8743b52063cd84097a65d1633f5c74f5", "id": "69d9faad-3f66-4d44-93ee-293682bf1046", "publicIdentifier": "8743b52063cd84097a65d1633f5c74f5", "format": "email" }], "email": "8743b52063cd84097a65d1633f5c74f5"
        }
    ]
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
            <div className='p-20 h-full bg-[#1f1f1f]'>
                {
                    datas.map((item) => <JsonItem key={item.Nounce} item={item} />)
                }
            </div>

        </div>
    )
}

export default SignatureData