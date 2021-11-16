import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import AppRoutesCliente from './app.routes.cliente';
import AppRoutesConsultor from './app.routes.consultor';
import AuthRoutes from './auth.routes';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Routes = (props) => {
  const { token, userType, linking } = props;
  console.log('log '+token +"\n"+ userType)

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