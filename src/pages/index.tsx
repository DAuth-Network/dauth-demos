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

  const logout = () => {
        localStorage.setItem('token', '')
        router.push('/auth')
    }


  return (
    <div className='flex flex-row'>
      <div className='w-1/2 h-screen p-20 bg-dark relative overflow-auto'>
        <div className='absolute top-0'>
          <Header></Header>
        </div>
        <div className='flex flex-row justify-around my-10'>
          <div className='w-28 h-28 flex-none bg-[#2b2b2b] rounded-full mr-10'>

          </div>
          <div className='w-4/5 flex flex-col justify-evenly'>
            <div className='bg-[#2b2b2b] rounded-2xl w-20 h-4'>
            </div>
            <div className='bg-[#2b2b2b] rounded-2xl w-32 h-4'>
            </div>
            <div>
              <MediaList verifiedList={verifiedList} />
            </div>
          </div>
        </div>
        <VerifiedList verifiedList={verifiedList} profile={profile ? profile.data : []} />

      </div>
      <div className='w-1/2  bg-liner  p-20 '>
        <div className='flex-1 flex justify-between items-center'>
          <div></div>
          {
            router.pathname !== '/auth' && <PrimaryButton passedClassName='w-[120px] h-[32px] bg-[#1f1f1f]  rounded-lg' style={{backgroundColor: '#1f1f1f'}}  onClick={logout}>Log out</PrimaryButton>
          }
        </div>
        <div >
          <SignatureData data={profileData} />
        </div>
      </div>
    </div>
  )
}
