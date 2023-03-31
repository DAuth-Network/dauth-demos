import Header from '@/components/Layout/Header';
import Image from 'next/legacy/image';
import SignatureData from '@/components/SignatureData';
import VerifiedList from '@/components/VerifiedList';
import { dauth_getUserInfo, IProfileItem } from '@/services/http';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import MediaList from "../components/MediaList";
import _ from 'lodash';
import useModal from '@/hooks/useModal';
const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string

export default function Home() {

  const { data: profile, mutate } = useRequest(dauth_getUserInfo, {});
  const profileData = useMemo(() => {
    if (profile && profile.data) {
      return profile.data.filter((item) => item.auth_hash)
    } else {
      return []
    }
  }, [profile])
  const verifiedList = useMemo(() => {
    return profileData.map((item) => item.auth_type.toLowerCase())
  }, [profileData])
  const username = useMemo(() => {
    const item = _.find(profileData, (item: IProfileItem) => item.auth_type.toLowerCase() === 'email')
    return item ? item.auth_hash.slice(-5) : ''

  }, [profileData])
  const handleConfirm = () => { }
  const { showModal, closeModal, Modal } = useModal()

  return (
    <GoogleOAuthProvider clientId={clientID}><div className='flex  lg:flex-row flex-col  h-screen bg-[#141414]'>
      <div className='lg:w-1/2  lg:h-screen h-3/5 lg:p-20 px-8 relative lg:overflow-auto'>
        <Modal modalIsOpen={false} closeModal={closeModal} onConfirm={handleConfirm} >
          <div>
            Authenticate your identity anonymously with the DAuth Network.
          </div>
          <div>
            
          </div>


        </Modal>
        <div className='lg:absolute top-0 w-full'>
          <Header className='px-0'></Header>
        </div>
        <div className='flex flex-row lg:justify-around lg:my-10 my-4 '>
          <div className='lg:w-28 lg:h-28 w-16 h-16 flex flex-none  rounded-full'>
            <Image src={'/avatar.png'} layout={'fixed'} width={100} height={100} alt='' />
          </div>
          <div className='w-4/5 flex flex-col justify-evenly'>
            <div className='w-20 h-4 mb-2 font-semibold'>
              Privateer{username}
            </div>
            <div className='rounded-2xl h-4 mb-2 text-gray-500'>
              Navigating the vast Decentralized Ocean 🌊
            </div>
            <div>
              <MediaList verifiedList={verifiedList} />
            </div>
          </div>
        </div>
        <VerifiedList showModal={showModal} verifiedList={verifiedList} profile={profile ? profile.data : []} />

      </div>
      <div className='lg:w-1/2  lg:h-screen h-2/5 w-full  bg-[#141414]  bg-liner lg:p-20 px-8 lg:px-0'>

        <div className=' mx-auto lg:w-4/5 h-full lg:h-auto' >
          <SignatureData data={profileData} />
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  )
}
