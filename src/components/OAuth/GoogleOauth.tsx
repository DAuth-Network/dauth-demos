import React, { FC } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { IconBaseProps } from 'react-icons'


interface IOAuthButton {
    icon: any
    isRefresh: boolean,

}
const GoogleOauth: FC<IOAuthButton> = ({ icon, isRefresh = false }) => {


    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default GoogleOauth