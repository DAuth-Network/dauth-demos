import { IProfileItem } from "@/services/http"
import { shorterString } from "@/utils"
import { FC } from "react"
import { IoShieldOutline } from "react-icons/io5"
import { IMediaItem } from "../Icons"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/store"
import { updateActivedItem } from "@/store/verifiedSlice"
import { TbRefresh } from "react-icons/tb"
import { githubLogin } from "@/services/http/oauth"
import OauthButton from "../OAuth/OauthButton"
import {useAccount} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";

interface IVerifiedItem {
    item: IMediaItem,
    verified: boolean,
    profile: IProfileItem[],
    disabled: boolean
}
const VerifiedItem: FC<IVerifiedItem> = ({ item, verified, profile, disabled = true }) => {
    const {isConnected} = useAccount()
    const activedItem = useSelector((state: RootState) => state.verifiedData.activedItem)
    const dispatch = useDispatch()
    const ready = ['email', 'google'].includes(item.name)
    const verifyData = profile.find((_item) => item.name === _item.auth_type.toLowerCase())
    const onClick = () => {
        dispatch(updateActivedItem(item.name))
    }
    const onRefresh = () => {

    }
    const onSuccess = (res: any) => {
        console.log(res)
    }
    const isActive = activedItem === item.name
    return <div className={`w-full lg:border-2 border border-[#383838] flex flex-col p-6 rounded-lg bg-[#1f1f1f] mt-4  lg:mt-8 ${isActive ? 'bg-[#2b2b2b]' : 'bg-[#1f1f1f]'} ${(!ready || disabled )? ' cursor-not-allowed' : ''}`} onClick={onClick}>
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
                verified && ready && <div className=" flex flex-grow justify-between">
                    <div className='text-[#40AA84] bg-[#1D322A] border border-[#40AA84] lg:rounded-lg rounded px-2 lg:text-base text-sm'>
                        Verified
                    </div>
                    {
                        item.name !== 'email' && < div className="w-2 cursor-pointer" >
                            <OauthButton item={item} ready={ready } isRefresh />
                        </div>
                    }
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
                    {verified && <> <IoShieldOutline size={18} color={"#40AA84"} /> &nbsp; <span>Your {item.name} has been abstracted</span></>}
                </div>

            </> :
                isConnected ? <OauthButton item={item} ready={false} /> : <ConnectButton/>
        }

    </div >
}
export default VerifiedItem
