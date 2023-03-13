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
        <div className='flex flex-row justify-evenly'>
          <div className='w-24 h-24 bg-slate-500 rounded-full'>

          </div>
          <div className='w-3/5 flex flex-col justify-evenly'>
            <div>
              test
            </div>
            <div>
              test2
            </div>
            <div>
              <MediaList />
            </div>
          </div>
        </div>
        <div className='flex'>
          <VerifiedList />

        </div>
      </div>
      <div className=''>

      </div>
    </div>
  )
}
