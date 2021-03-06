
export default () => {
  return {
    name: 'Killer Hat',
    scheme: 'killer.hat',
    version: '0.0.5',
    ios: {
      bundleIdentifier: 'killer.hat'
    },
    orientation: 'landscape',
    icon: './assets/logo-killer-hat-ios.png',    
    splash: {
      image: './assets/splash-screen.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    ios: {
      supportsTablet: true,
      requireFullScreen: true,
      bundleIdentifier: "killer.hat"
    },
    android: {
      package: 'killer.hat',
      icon: "./assets/logo-killer-hat.png",
      versionCode: 5
    },
    web: {
      favicon: './assets/logo-killer-hat.png' 
    }
  };
};