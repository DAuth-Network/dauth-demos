import React, { FC, useEffect, useMemo, useState } from 'react'
import { MdHistory } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import JsonItem from '../JsonItem'
import Logout from '../Logout'
import { RootState } from '@/store'
import { useSelector } from 'react-redux';
import { Fira_Code } from 'next/font/google'
import _ from 'lodash'
import { mediasIcons } from '../Icons'
interface ISignatureData {
    data?: any
}
const firaCode = Fira_Code({ subsets: ['latin'] })

const SignatureData: FC<ISignatureData> = ({ data }) => {
    const activedItem = useSelector((state: RootState) => state.verifiedData.activedItem)
    const [jwt, setJwt] = useState('')

    useEffect(() => {
      // Perform localStorage action
      const item = localStorage.getItem('token')
      setJwt(item!)
    }, [])
    const [showAll, setShowAll] = useState(false)
    const onClick = () => {
        setShowAll(!showAll)
    }
    
    const item = useMemo(() => {
        return _.find(
            mediasIcons, (item) => item.name.toLowerCase() === activedItem)
    }, [activedItem, mediasIcons])
    return (
        <div className='flex flex-col-reverse lg:flex-col justify-between h-full'>
            <div className='lg:pb-10 flex lg:flex-col py-2 flex-row-reverse lg:justify-center justify-between items-center  lg:items-end lg:-mt-10'>
                <div className='lg:mb-10'>
                    <Logout />
                </div>
                <div className={`py-0.5 px-1  w-16 flex-initial bg-[#1f1f1f] inline-flex justify-between   rounded-full  `}>
                    <button className={`mr-2 w-6 h-6 rounded-full px-1`} onClick={onClick}>
                        {
                            !showAll ?
                                <MdHistory color={'#9352FF'} className={`${!showAll ? 'visible' : 'hidden'}`} size={18} />
                                : <div className='w-5 h-5 bg-white rounded-full'>
                                </div>
                        }
                    </button>
                    <button className={` rounded-full pr-1`} onClick={onClick}>
                        {
                            showAll ?
                                <FaUserAlt color={'#9352FF'} size={16} /> : <div className='w-5 h-5   bg-white rounded-full'>
                                </div>
                        }

                    </button>
                </div>

            </div>
            <div className='lg:h-full  bg-[#1f1f1f]  rounded-lg  overflow-scroll relative'>
                <div className='bg-[#3D2860] py-4 lg:px-10 px-6 text-lg font-semibold flex'>
                    Credential proof &nbsp;
                    {
                        !showAll && <span className='flex'>
                        for
                        <div className='ml-4 mr-2 flex items-center'>
                            <div className='p-1 rounded-full bg-white'>{
                                item!.icon({ size: 16, color: '#1F1F1F' })
                            }
                            </div>
                        </div>
                        <div className='lg:text-lg text-base font-semibold mr-4 capitalize'>
                            {item!.name}
                        </div>
                    </span>
                    }
                </div>
                <div className='lg:py-20 lg:px-10 p-6 te '>
                    <JsonItem item={{jwt}}/>
                </div>
            </div>

        </div>
    )
}

export default SignatureData