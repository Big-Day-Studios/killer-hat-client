import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, setTimeout } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";


const Routes = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    const getInfo = async () => {
        const isLogged = await AsyncStorage.getItem('@killer:isLoggedIn')
        console.log("fff  '" + isLogged+ "'")
        if(isLogged.toLocaleLowerCase() === "true") {
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
        console.log(JSON.stringify(isLogged).toLocaleLowerCase())
    }
    
    useEffect(() => {
        getInfo()
        console.log("ggg " + isLoggedIn);
    }, [1000])


    // console.log(linking)

    return(
        <NavigationContainer >
            { isLoggedIn ? <StackRoutes.LoggedIn/> :  <StackRoutes.BeforeLogin/> }
        </NavigationContainer>
    );
}

export default Routes;