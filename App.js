// console.disableYellowBox = true
import React, { Component, useEffect, useState }from 'react';
import  Routes  from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import i18next from './src/languages';
import * as Linking from 'expo-linking'
import { View, Text,StatusBar } from 'react-native';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import * as ScreenOrientation from 'expo-screen-orientation';

const prefix = Linking.makeUrl("/");

export default function App () {
    
  const [data, setData] = useState(null)
  
  useEffect(() => {
    StatusBar.setHidden(true);
    lockOrientation()
  }, [])
  
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(5)
  }
  
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ['Patrocinador']: "patrocinador",
        ['Nome']: "nome",
      },
    }
  }
  
  
  
  function handleDeepLink(event){ 
    let data = Linking.parse(event.url)
    setData(data)
  }

  useEffect(() => {

    async function getInitialUrl(){
      const initialUrl = await Linking.getInitialURL();
      if(initialUrl){
        setData(Linking.parse(initialUrl));
      }
    }

    Linking.addEventListener('url', handleDeepLink);

    if(!data){
      getInitialUrl();
    }

    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  return (
    <InternetConnectionAlert onChange={(connectionState) => {
      console.log("Connection State: ", connectionState);
    }}>
        <Routes linking={linking} />
        {/*         
          <View >
            <Text>
              {data ? JSON.stringify(data): "App not opened from deep link"}
            </Text>
            <StatusBar style="auto" />
          </View> 
        */}
    </InternetConnectionAlert>
  );
}

