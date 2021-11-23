import React, { useEffect, createContext, useContext } from 'react';
import { View, Text } from 'react-native';

import AppRoutesCliente from './app.routes.cliente';
import BeforeLogin from './auth.routes';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

import { useSplashScreen } from '../contexts/LoadSplashScreen.js';

const Routes = (props) => {
  const { token, userType, linking } = props;
  console.log('log '+token +"\n"+ userType)

  const load = useSplashScreen()

  console.log('load ', load );


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
  }
}

export default connect(mapStateToProps)(Routes);