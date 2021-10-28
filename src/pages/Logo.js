import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView , Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC700, TextNotoSansTC500 } from '../components/fonts/TextFonts';
import ExtraDimensions  from 'react-native-extra-dimensions-android';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
import { Icon } from 'react-native-elements';
import BdsLogoAnimatios from '../components/BdsLogoAnimation';


import { theme } from '../global/theme';

const Logo = ({navigation}) => {
    
  return (
      <SafeAreaView style={[styles.container, styles.center, styles.full]} >
        <View initialMetrics={initialWindowMetrics} style={{height: "80%",width: "80%"}}>
          <BdsLogoAnimatios style={{height: "100%",width: "100%" }}/>
        </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 40,
  },
  full: {
    height: '100%',
    width: "100%"
  },
  text:{
    fontSize: 20, 
    color: "#fc5000",
    width: '40%',
    marginTop: 10
  },
  input: {
    paddingLeft: 15,
    alignItems: 'center',
    borderRadius: 20,
    fontSize: 15,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#9A9A9A',
    marginTop: 10, 
    shadowColor: "#000",
    shadowOpacity: 0.27,
    shadowRadius: 0.25,
      
    shadowOffset: {
      width: 0,
        height: -3,
    },
    elevation: 6,
  },
  txtAvancar: {
    fontSize: 22,
    color: '#fff' 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
    borderRadius: 42,
    height: 57,
    width: 144,
  },
});

export { Logo };
