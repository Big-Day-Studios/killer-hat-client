import React from "react";
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import Login from "../pages/Login";
import Choose from "../pages/Choose";
import Name from "../pages/signup/Name";
import Email from "../pages/signup/Email";
import Password from "../pages/signup/Password";
import Birthday from "../pages/signup/Birthday";
import VerifyEmail from "../pages/VerifyEmail";



import { Splash } from "../pages/Splash";
const stackRoutes = createNativeStackNavigator();

const BeforeLogin = () => (
    <stackRoutes.Navigator  screenOptions={{ headerShown: false }} headerMode="none">
        <stackRoutes.Screen name="Choose" component={Choose}/>
        <stackRoutes.Screen name="Splash" component={Splash} />
        <stackRoutes.Screen name="Login" component={Login}/>
        <stackRoutes.Screen name="VerifyEmail" component={VerifyEmail}/>
        <stackRoutes.Screen name="Name" component={Name}/>
        <stackRoutes.Screen name="Email" component={Email}/>
        <stackRoutes.Screen name="Birthday" component={Birthday}/>
        <stackRoutes.Screen name="Password" component={Password}/>
    </stackRoutes.Navigator>
)

export default BeforeLogin;
