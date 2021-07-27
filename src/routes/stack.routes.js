import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../pages/Login";
import { Patrocinador } from "../pages/Patrocinador";



const stackRoutes = createStackNavigator();

const AppRoutes = () => (
    <stackRoutes.Navigator headerMode="none" 
    screenOptions={{
        cardStyle: {
            backgroundColor: 'white',
        },
    }}>

        <stackRoutes.Screen name="Login" component={Login}/>
        <stackRoutes.Screen name="Patrocinador" component={Patrocinador}/>


    </stackRoutes.Navigator>
)

export default AppRoutes;