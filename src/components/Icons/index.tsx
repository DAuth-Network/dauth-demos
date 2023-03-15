import { IoMdMail } from 'react-icons/io'
import { FaTelegramPlane } from 'react-icons/fa'
import { DiGithubAlt } from 'react-icons/di'
import { BsDiscord, BsGoogle, BsTwitter } from 'react-icons/bs'
import { IconType } from 'react-icons'


const twitterIcon = BsTwitter
const telegramIcon = FaTelegramPlane
const emailIcon = IoMdMail
const githubIcon = DiGithubAlt
const googleIcon = BsGoogle
const discordIcon = BsDiscord
export interface IMediaItem {
    name: string,
    icon: IconType
}
export const mediasIcons = [
    {
        name: 'email',
        icon: emailIcon,
    }, {
        name: 'twitter',
        icon: twitterIcon,
    }, {
        name: 'telegram',
        icon: telegramIcon,
    }, {
        name: 'github',
        icon: githubIcon,
    }, {
        name: 'google',
        icon: googleIcon,
    }, {
        name: 'discord',
        icon: discordIcon,
    }
]