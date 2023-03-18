import PrimaryButton from '@/components/Button/PrimaryButton';
import Header from '@/components/Layout/Header';
import SignatureData from '@/components/SignatureData';
import VerifiedList from '@/components/VerifiedList';
import { dauth_getUserInfo } from '@/services/http';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MediaList from "../components/MediaList";
export default function Home() {
  const { data: profile, mutate } = useRequest(dauth_getUserInfo, {});
  const router = useRouter()
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




  return (
    <div className='flex  lg:flex-row flex-col  h-screen bg-[#141414]'>
      <div className='lg:w-1/2  lg:h-screen h-3/5 lg:p-20 px-8 relative lg:overflow-auto'>
        <div className='lg:absolute top-0 w-full'>
          <Header className='px-0'></Header>
        </div>
        <div className='flex flex-row lg:justify-around lg:my-10 my-4 '>
          <div className='lg:w-28 lg:h-28 w-16 h-16 flex-none bg-[#2b2b2b] rounded-full mr-10'>

          </div>
          <div className='w-4/5 flex flex-col justify-evenly'>
            <div className='bg-[#2b2b2b] rounded-2xl w-20 h-4 mb-2'>
            </div>
            <div className='bg-[#2b2b2b] rounded-2xl w-32 h-4 mb-2'>
            </div>
            <div>
              <MediaList verifiedList={verifiedList} />
            </div>
          </div>
        </div>
        <VerifiedList verifiedList={verifiedList} profile={profile ? profile.data : []} />

      </div>
      <div className='lg:w-1/2  lg:h-screen h-2/5 w-full  bg-[#141414]  bg-liner lg:p-20 px-8 lg:px-0'>
        
        <div className=' mx-auto lg:w-4/5 h-full lg:h-auto' >
          <SignatureData data={profileData} />
        </div>
      </div>
    </div>
  )
}
