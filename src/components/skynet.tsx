import { useLayoutEffect } from "react";
import { useKernelAuth } from "../pages/auth.js";
import {useProfile} from "../pages/skyDAC.js";
import { openAuthWindow} from "libkernel";

export default function Profile(): JSX.Element{
    const {userAuthStatus, bootloaderLoaded, isKernelLoaded} = useKernelAuth();
    // userprofile and avatar returned
    console.log("returned userAuth: ", userAuthStatus);
    console.log("returned kernelLoaded: ", isKernelLoaded);
    const {userProfile, avatar} = useProfile(userAuthStatus, isKernelLoaded);
    
    // use if userauth or kernel loaded, run each time they are changed '
    return <div id="profile_comp">
        <a onClick={openAuthWindow}>
            Login
        </a>
    </div>
}
