import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppStackCliente = createNativeStackNavigator();

const LoggedIn = (linking) => (
  <AppStackCliente.Navigator linking={linking}>
  </AppStackCliente.Navigator>
)

export default LoggedIn;