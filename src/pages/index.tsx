import VerifiedList from '@/components/VerifiedList';
import { dauth_getUserInfo } from '@/services/http';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MediaList from "../components/MediaList";
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // router.push('/auth')
    const token = localStorage.getItem('token')
    console.log("token", token)
    dauth_getUserInfo().then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })


  }, [router])

  return (
    <div className='h-screen'>
      <div className='w-1/2 h-full p-20 bg-dark'>
        <div className='flex flex-row justify-around my-10'>
          <div className='w-28 h-28 bg-[#2b2b2b] rounded-full mr-10'>

          </div>
          <div className='w-4/5 flex flex-col justify-evenly'>
            <div className='bg-[#2b2b2b] rounded-2xl w-20 h-4'>
            </div>
            <div className='bg-[#2b2b2b] rounded-2xl w-32 h-4'>
            </div>
            <div>
              <MediaList />
            </div>
          </div>
        </div>
        <div className='flex font-semibold'>
          <VerifiedList />

        </div>
      </div>
      <div className=''>

      </div>
    </div>
  )
}
