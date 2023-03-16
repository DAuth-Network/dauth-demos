import { IoMdMail } from 'react-icons/io'
import { FaTelegramPlane } from 'react-icons/fa'
import { BsDiscord, BsGoogle, BsTwitter, BsGithub } from 'react-icons/bs'
import { IconType } from 'react-icons'


const twitterIcon = BsTwitter
const telegramIcon = FaTelegramPlane
const emailIcon = IoMdMail
const githubIcon = BsGithub
const googleIcon = BsGoogle
const discordIcon = BsDiscord
export interface IMediaItem {
    name: string,
    icon: IconType
}

// email, google, github, twitter, discord, tg
export const mediasIcons = [
    {
        name: 'email',
        icon: emailIcon,
    },
    {
        name: 'google',
        icon: googleIcon,
    },
    {
        name: 'github',
        icon: githubIcon,
    }, {
        name: 'twitter',
        icon: twitterIcon,
    }, {
        name: 'discord',
        icon: discordIcon,
    },
    {
        name: 'telegram',
        icon: telegramIcon,
    },
]