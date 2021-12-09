import React from 'react';
import Main from '../pages/Main';
import Gameplay from '../pages/Gameplay';
import Win from '../pages/Win';
import Lose from '../pages/Lose';

import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import Logout from "../services/Logout";

const stackRoutes = createNativeStackNavigator();

const LoggedIn = (linking) => (
  <stackRoutes.Navigator screenOptions={{ headerShown: false }} headerMode="none" linking={linking}>
    <stackRoutes.Screen name="Main" component={Main}/>
    <stackRoutes.Screen name="Gameplay" component={Gameplay}/>
    <stackRoutes.Screen name="Win" component={Win}/>
    <stackRoutes.Screen name="Lose" component={Lose}/>
    <stackRoutes.Screen name="Logout" component={Logout}/>
  </stackRoutes.Navigator>
)

export default LoggedIn;