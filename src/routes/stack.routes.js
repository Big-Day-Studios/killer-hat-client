import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from "../pages/Login";

const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  screenOptions={{ headerShown: false }} headerMode="none">
        <stackRoutes.Screen name="Login" component={Login}/>
    </stackRoutes.Navigator>
)

const LoggedIn = () => (
    <stackRoutes.Navigator screenOptions={{ headerShown: false }} headerMode="none">
    </stackRoutes.Navigator>
)

export default { LoggedIn, BeforeLogin }