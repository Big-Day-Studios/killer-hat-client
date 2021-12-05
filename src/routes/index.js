import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text } from 'react-native';
import { Audio } from 'expo-av';
import AppRoutesCliente from './app.routes.cliente';
import BeforeLogin from './auth.routes';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

import { useSplashScreen } from '../contexts/LoadSplashScreen.js';

const Routes = (props) => {
  const { token, userType, linking, playMusic } = props;
  console.log('log '+token +"\n"+ userType)

  const load = useSplashScreen()

  console.log('load ', load );

  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/music/menu.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    console.log(await sound.getStatusAsync())

    await sound.setIsLoopingAsync(true);
    await sound.playAsync(); 
  }

  async function pauseSound() {
    await sound.stopAsync()
    console.log(await sound.getStatusAsync())

  }

  useEffect(() => {
    if(token){
      if(playMusic){
        playSound()
      }else{
        console.log(playMusic)
        pauseSound()
      }
    }
  }, [playMusic])


  return (
    token 
    ?
      <AppRoutesCliente  linking={linking} />
    :
      <BeforeLogin linking={linking} />
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userType: state.authReducer.userType,
    playMusic: state.authReducer.playMusic,
  }
}

export default connect(mapStateToProps)(Routes);