import { useState, useEffect } from 'react';
import {
  init,
  kernelLoaded,
  kernelVersion,
  loginComplete,
  logoutComplete,
  openAuthWindow,
} from 'libkernel';

//  start auth flows as component loads prior to return 
export const useKernelAuth = () => {
  const [userAuthStatus, setUserAuthStatus] = useState(false);
  const [bootloaderLoaded, setBootloaderLoaded] = useState(false);
  const [isKernelLoaded, setIsKernelLoaded] = useState(false);

  // on first load, check authentication status of user
  // this also calls init()
  useEffect(() => {
    // call async method
    checkAuthStatus();
    console.log("use effect on load")
    // run first time page loads
  }, []);

  const checkAuthStatus = async () => {
    // // mock load success for testing UI starting points

    // setBootloaderLoaded(true);
    // setUserAuthStatus(true);
    // setIsKernelLoaded(true);
// return;

    // Bootloader init
    await init();
    const version = await kernelVersion();
    console.log("version", version);
    setBootloaderLoaded(true);
    console.log("hjgfdghjk");
    // bootloader lioasds kernel and checks user logged in

    // wll not return until usr logged in
    loginComplete().then(() => {
        console.log("loginComplete promise returned");
        // "local app state" 
      setUserAuthStatus(true);
    });
    //  wll not return until kernl loads
    kernelLoaded().then(() => {
        console.log("kernelLoaded promise returned");
        //  update app state
      setIsKernelLoaded(true);
    });

    logoutComplete().then(() => {
        console.log("logoutComplete promise returned");
      setUserAuthStatus(false);
    });
  };
//   method which opens login screen
//  needed to use with an onclick action
// handld in onclick function 
//  function which displays button on click 
  const login = () => {
    openAuthWindow();
  };

  return {
    userAuthStatus,
    bootloaderLoaded,
    isKernelLoaded,
  };
};

export default useKernelAuth;