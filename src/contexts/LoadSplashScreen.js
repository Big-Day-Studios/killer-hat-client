import React, { createContext, useState, useContext } from 'react'

const LoadSplashScreen = createContext({});

export const LoadProvider = ({ props }) => {
  const [loadSplashScreen, setLoadSplash] = useState(true);
  const setLoadSplashScreen = (prop) => {
    setLoadSplash(prop)
  }



  return (
    <LoadSplashScreen.Provider value={{ loadSplashScreen, setLoadSplashScreen }}>
      {props}
    </LoadSplashScreen.Provider>
  )
};

export default LoadSplashScreen;

export function useSplashScreen() {
  return useContext(LoadSplashScreen);
}