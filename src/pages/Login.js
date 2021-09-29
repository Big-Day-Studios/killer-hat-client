import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextMuseo300, TextMuseo500 } from '../components/fonts/TextFonts';
import { TextInputMuseo300 } from '../components/fonts/TextInputFonts';
import { Icon } from 'react-native-elements';

import { theme } from '../global/theme';
import ApiRequest from '../services/Api';


import { Root, Popup } from 'popup-ui';

const Login = ({navigation}) => {

  const {t, i18n} = useTranslation();

  const insets = useSafeAreaInsets();

  function handleNext() {
      navigation.push('');
  }

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [iconPasswordHide, setIconPasswordHide] = useState("lock")
  const [isLoading, setIsLoading] = useState(false)

  const [userData, setUserData] = useState(
    {
      username: "",
      password: "",
      
    }
  )

  const oldState = userData;

  const togglePassword = () => {
    if(isPasswordHide){
      setIsPasswordHide(false);
      setIconPasswordHide("unlock")
    }else{
      setIsPasswordHide(true);
      setIconPasswordHide("lock")
    }
  }
  
  const errorPopup = () => {
      Popup.show({
        type: 'Danger',
        title: 'Erro',
        button: true,
        textBody: msg,
        buttonText: 'Ok',
        callback: () => Popup.hide()
      })
  }

  useEffect(() => {
    if(!!msg){
      errorPopup()
    }
    setMsg(undefined)
  }, [msg])

  const responseVerifier = async () => {
    if(!!response){
      if(typeof response === 'object'){
        //response.token is just an example of the token
        if(response.token === "" || response.token === undefined ){
          //token isn't Ok
        }else{
          //token is Ok
        }
        setIsLoading(false);
      }else{
        setMsg('Não foi possível acessar o servidor. :(')
        setIsLoading(false);

      }
    }
  }

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setIsLoading(true)
      //await ApiRequest.login(userData, setResponse);
    }
  }

  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(
        name,
        value
        );
      } catch (error) {
        console.log(error);
      }
    };
    
  return (
    <Root>   
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
      }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics} style={
          styles.container, 
          {paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,}
        }
        >

            <StatusBar style="auto" />
            <View style={styles.container}>
              <View style={{
                flex: 1,
                alignItems: 'center',
              }}>
                <TextMuseo300 style={styles.text}>{t("loginPage.placeHolderUser")}</TextMuseo300>
                <TextInputMuseo300  
                  onSubmitEditing={() => { this.passwordInput.focus(); }}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholderTextColor="#fc5000" 
                  onChangeText={( username) => {
                    setUserData({ username, password: oldState.password });
                  }} 
                  style={styles.input}
                />
                
                <TextMuseo300 style={styles.text}>{t("loginPage.placeHolderPass")}</TextMuseo300>
                <View style={{
                    flexDirection: 'row'
                }}>
                <TextInputMuseo300
                  style={styles.input}
                  /* inputRef={(ref) => this.passwordInput = ref} */
                  placeholderTextColor="#fc5000" 
                  onChangeText={(password) => {
                    setUserData({username: oldState.username,password})
                  }}  
                  onSubmitEditing={sendApiRequest}
                  secureTextEntry={isPasswordHide}
                /> 
                  <View style={{
                    position: 'absolute',
                    right: '2%',
                    bottom: '15%',
                  }}>
                    <TouchableOpacity onPress={togglePassword}>
                      <Icon
                        name={iconPasswordHide}
                        type="font-awesome"
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 10
              }}>
                <TouchableOpacity style={styles.btnAvancar} onPress={sendApiRequest}>
                  {!isLoading
                    ?
                    <TextMuseo500 style={styles.txtAvancar}>{t("common.nextButton")}</TextMuseo500>

                    :             
                      <View style={[styles.container, styles.center, styles.full]}>
                        <ActivityIndicator color={"#999999"} size="large" />
                      </View>
                  }
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaProvider>
      </ScrollView>
    </Root>
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
  text:{
    fontSize: 20, 
    color: "#fc5000",
    width: '70%',
    marginTop: 10
  },
  input: {
    width: '70%',
    height: 40,
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 6,
    backgroundColor: theme.colors.principalOne,
    color: '#fff',
    marginTop: 10
  },
  txtAvancar: {
    fontSize: 22,
    color: '#fff' 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc5000',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});

export { Login };
