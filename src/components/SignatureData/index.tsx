import React, { FC, useMemo, useState } from 'react'
import { MdHistory } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import JsonItem from '../JsonItem'
import Logout from '../Logout'
import { RootState } from '@/store'
import {useSelector} from 'react-redux';
import { Fira_Code } from 'next/font/google'
interface ISignatureData {
    data: any
}
const firaCode = Fira_Code({ subsets: ['latin'] })

const SignatureData: FC<ISignatureData> = ({ data }) => {
    const activedItem = useSelector((state: RootState) => state.verifiedData.activedItem)

    const [showAll, setShowAll] = useState(false)
    const onClick = () => {
        setShowAll(!showAll)
    }
    const dataToShow = useMemo(() => {
        if (showAll) {
            return data
        } 
        console.log(activedItem, 'activedItem')
        return data.find((item: any) => item.auth_type.toLowerCase() === activedItem)
        
    }, [showAll, activedItem, data])
    return (
        <div className='flex flex-col-reverse lg:flex-col justify-between h-full'>
            <div className='lg:pb-10 flex lg:flex-col py-2 flex-row-reverse lg:justify-center justify-between items-center  lg:items-end lg:-mt-10'>
                <div className='lg:mb-10'>
                <Logout />
                </div>
                <div className={`py-0.5 px-1  w-16 flex-initial bg-[#1f1f1f] inline-flex justify-between   rounded-full  `}>
                    <button  className={`mr-2 w-6 h-6 rounded-full px-1`} onClick={onClick}>
                        {
                            !showAll ?
                                <MdHistory color={'#9352FF'} className={`${!showAll ? 'visible' : 'hidden'}`} size={18} />
                                : <div className='w-5 h-5 bg-white rounded-full'>
                                </div>
                        }
                    </button>
                    <button  className={` rounded-full pr-1`} onClick={onClick}>
                        {
                            showAll ?
                                <FaUserAlt color={'#9352FF'} size={16} /> : <div className='w-5 h-5   bg-white rounded-full'>
                                </div>
                        }

                    </button>
                </div>

            </div>
            <div className='lg:p-20 lg:h-full  bg-[#1f1f1f]  rounded-lg p-4'>
                {
                   dataToShow ?  <JsonItem item={dataToShow} /> : <span className={`${firaCode.className} text-sm`}>// Verify your accounts to see DAuth in actions</span>
                }
            </div>

        </div>
    )
}

export default SignatureData