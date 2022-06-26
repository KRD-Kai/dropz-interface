import { useState, useEffect, useReducer } from 'react';
import { IdentityDAC, ProfileDAC, Profile } from 'skynet-dacs-library';
import _ from 'lodash'
// import { profile } from 'console';


// Used in AuthButton.js
export const useProfile = (userAuthStatus, isKernelLoaded) => {

  const [userProfile, setUserProfile] = useState();
  const [avatar, setAvatar] = useState();

  // // Once logged in and kernelLoaded:
  // // Get userId and use it to fetch user's profile
  // // Using the profile, get a URL for accessing the profile image.

  useEffect(() => {
    const getUserID = async () => {
        console.log("top of getUSerId");
      try {
        let identityDAC = new IdentityDAC();
        const userID = await identityDAC.userID();
        console.log(userID);

        let profileDAC = new ProfileDAC();
        const result = await profileDAC.getProfile(userID);
        let test_r = result;
        test_r['ext'] = "stuff";
        const fuck = test_r;
        const set = await profileDAC.setProfile(fuck);
        const plswork = await profileDAC.getProfile(result);
        console.log(plswork.json());
        // console.log('got result from profile');
        // console.log(result);
        // console.log("setting profile");
        // set and await response
        const temp_user = {username: "bob"}
        // const set = await profileDAC.setProfile(temp_user);


        const updated_profile = await profileDAC.getProfile(userId);
        console.log("test", updated_profile.json());
        setUserProfile(result);
        setAvatar(avatarFieldToUrl(result?.avatar));
      } catch (err) {
        console.error({ err });
      }
      console.log("bottom of getUser");
    };
    console.log("checking user auth status and user is loaded");
    console.log("auth status:", userAuthStatus);
    console.log("kernelLoaded: ", isKernelLoaded);
    if (userAuthStatus && isKernelLoaded) {
      getUserID();
    }
  }, [userAuthStatus, isKernelLoaded]);

  return {
    userProfile, //current userProfile from ProfileDAC
    avatar, //current user's avatar URL
  };
};
// setProfile({ext: {texthere}})
//  let p = await getProfile()
//  set Profile({...p, ext:{key: value, key2: value2}})
// p['ext']= {json obj}