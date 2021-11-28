import React from "react";
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import Login from "../pages/Login";
import Choose from "../pages/Choose";
import Name from "../pages/signup/Name";


import { Splash } from "../pages/Splash";
const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  screenOptions={{ headerShown: false }} headerMode="none">
        <stackRoutes.Screen name="Choose" component={Choose}/>
        <stackRoutes.Screen name="Splash" component={Splash} />
        <stackRoutes.Screen name="Login" component={Login}/>
        <stackRoutes.Screen name="Name" component={Name}/>
    </stackRoutes.Navigator>
)

export default BeforeLogin;
