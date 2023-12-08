import {FaTwitter} from "react-icons/fa";
import {IoLogoDiscord} from "react-icons/io5";

const Footer = () => {
    return (
        <footer className={'flex justify-center flex-shrink-0 my-10'}>
            <a href="https://discord.gg/WXzQCzeJ" target={"_blank"} className={'px-4'}>
                <IoLogoDiscord size={28}/>
            </a>

            <a href="https://twitter.com/openid_3" target={"_blank"}>
                <FaTwitter  size={28}/>

            </a>

        </footer>

    );
}
export default Footer