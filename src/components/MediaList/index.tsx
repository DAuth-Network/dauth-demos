import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { mediasIcons } from '../Icons'
import {orderBy} from 'lodash'
import _ from 'lodash'

interface IMediaItem {
  active: boolean,
  name: string,
  icon: IconType
}

const MediaItem: FC<IMediaItem> = ({ name, icon, active }) => {
  return <div className={`lg:p-1.5 p-1 rounded-full flex justify-center items-center lg:mr-5 mr-2  ${active ? 'bg-[#4285f4]' : 'bg-[#626262]'}`}>
    {
      icon({ size: 16, color: `${active ? '#fff' : '#1f1f1f'}` })
    }
    <div></div>
  </div>
}
interface IMediaList {
  verifiedList: string[]
}
const MediaList:FC<IMediaList> = ({verifiedList}) => {
  const _mediaIcons = orderBy(mediasIcons, (item) => verifiedList.includes(item.name) ? 0 : 1)
  return (
    <div className='flex flex-row '>
      {
        _mediaIcons.map((item, index) => {
          return <MediaItem name={item.name} icon={item.icon} active={verifiedList.includes(item.name)} key={item.name} />
        })
      }
    </div>
  )
}

export default MediaList