import React from 'react';
import Main from '../pages/Main';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import Logout from "../services/Logout";

const stackRoutes = createNativeStackNavigator();

const LoggedIn = (linking) => (
  <stackRoutes.Navigator screenOptions={{ headerShown: false }} headerMode="none" linking={linking}>
    <stackRoutes.Screen name="Main" component={Main}/>
    <stackRoutes.Screen name="Logout" component={Logout}/>
  </stackRoutes.Navigator>
)

export default LoggedIn;