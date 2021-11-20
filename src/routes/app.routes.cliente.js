import React from 'react';
import Main from '../pages/Main';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';

const stackRoutes = createNativeStackNavigator();

const LoggedIn = (linking) => (
  <stackRoutes.Navigator linking={linking}>
    <stackRoutes.Screen name="Main" component={Main}/>
  </stackRoutes.Navigator>
)

export default LoggedIn;