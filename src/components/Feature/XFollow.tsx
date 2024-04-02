import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { GoogleLogin , useGoogleOneTapLogin } from "@react-oauth/google";

interface XFollowProps {
  clientId: string;
}

const XFollow = ({ clientId }: XFollowProps) => {
  // This will be called on successful login
  const successGoogle = (response: any) => {
    console.log('logged in success', response);
  };

  // This will be called on login failure
  const responseGoogle = () => {
    console.log('failed logging in');
  };

  const [isFollowed, setIsFollowed] = useState(false);
  const handleFollow = () => {
    setTimeout(() => {
      setIsFollowed(true);
    }, 10000);
  };

  return (
    <div>
      <div className="step-2">
        <p className="text-sm">step 01</p>
        <a href="https://twitter.com/openid_3" target="_blank" rel="noopener noreferrer">
          <button style={{width:'14.5rem'}} onClick={handleFollow} className="bg-slate-50 font-light text-dark text-xs rounded p-2 my-1">
            <div className="flex items-center justify-center">
              <span className="mr-1"><BsTwitter /></span>
              Follow Us
            </div>
          </button>
        </a>
      </div>
      <div className="step-3 my-5">
        <p className="text-sm">step 02</p>
        <div  className={` w-60  my-1 rounded ${isFollowed ? "" : "disabled"}`}>
      <GoogleLogin 
      
      onSuccess={successGoogle}
      onError={responseGoogle}/>
      
      
        </div>
     
      </div>
    </div>
  );
};

export default XFollow;
