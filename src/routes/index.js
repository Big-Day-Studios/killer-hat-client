import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, setTimeout } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";


const Routes = () => {


    // console.log(linking)

    return(
        <NavigationContainer >
            { <StackRoutes.BeforeLogin/> }
        </NavigationContainer>
    );
}

export default Routes;