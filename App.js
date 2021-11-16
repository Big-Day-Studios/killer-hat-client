// console.disableYellowBox = true
import React, { Component, useEffect, useState }from 'react';
import  Routes  from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import i18next from './src/languages';
import * as Linking from 'expo-linking'
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

/* Redux and Redux Persist */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/reducers/Store';

import i18next from './src/languages';

const prefix = Linking.makeUrl("/");

export default function App () {

  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Patrocinador: "patrocinador",
        Nome: "nome",
      },
    }
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

  function handleDeepLink(event){ 
    let data = Linking.parse(event.url)
    setData(data)
  }

  return (
    <InternetConnectionAlert onChange={(connectionState) => {
      //console.log("Connection State: ", connectionState);
    }}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes linking={linking} />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </InternetConnectionAlert>
  );
}