import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { mediasIcons } from '../Icons'


interface IMediaItem {
  active: boolean,
  name: string,
  icon: IconType
}

const MediaItem: FC<IMediaItem> = ({ name, icon, active }) => {
  return <div className={`p-1.5 rounded-full flex justify-center items-center mr-5  ${active ? 'bg-[#4285f4]' : 'bg-[#626262]'}`}>
    {
      icon({ size: 20, color: `${active ? '#fff' : '#1f1f1f'}` })
    }
  </div>
}
const MediaList = () => {
  return (
    <div className='flex flex-row'>
      {
        mediasIcons.map((item, index) => {
          return MediaItem({ name: item.name, icon: item.icon, active: index === 0 })
        })
      }
    </div>
  )
}

export default MediaList