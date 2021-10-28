import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions , Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC700, TextNotoSansTC500 } from '../components/fonts/TextFonts';
import ExtraDimensions  from 'react-native-extra-dimensions-android';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
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
            <View style={[styles.container, styles.center, styles.full]} >
              <TextNotoSansTC700 style={[styles.header]}>
              Enter your account
              </TextNotoSansTC700>
              <View style={[styles.container]}>
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                  <TextInputNotoSansTC300  
                    onSubmitEditing={() => { this.passwordInput.focus(); }}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    placeholderTextColor="#9A9A9A" 
                    placeholder={t("loginPage.placeHolderUser")}
                    // onChangeText={( username) => {
                    //   setUserData({ username, password: oldState.password });
                    // }} 
                    style={styles.input}
                  />
                  
                  <View style={{
                      flexDirection: 'row'
                  }}>
                  <TextInputNotoSansTC300
                    style={styles.input}
                    /* inputRef={(ref) => this.passwordInput = ref} */
                    placeholderTextColor="#9A9A9A" 
                    placeholder={t("loginPage.placeHolderPass")}
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
                          color="#9A9A9A"
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
                      <TextNotoSansTC500 style={styles.txtAvancar}>{t("common.nextButton")}</TextNotoSansTC500>
                      :             
                        <View style={[styles.container, styles.center, styles.full]}>
                          <ActivityIndicator color={"#999999"} size="large" />
                        </View>
                    }
                  </TouchableOpacity>
                </View>
              </View>
              </View>
        </SafeAreaProvider>
      </ScrollView>
    </Root>
  );
}
const  getScreenValues = () => {
  const androidWindowWidth =  ExtraDimensions.getRealWindowWidth();
  const androidWindowHeight = ExtraDimensions.getRealWindowHeight();
  
  const iosWindowWidth = Dimensions.get('window').width
  const iosWindowHeight = Dimensions.get('window').height

  console.log(androidWindowWidth, androidWindowHeight, iosWindowWidth, iosWindowHeight)
  if(androidWindowWidth === 0 || androidWindowHeight === 0 ){
    return {
      width: iosWindowWidth,
      height: iosWindowHeight
    }
  }

  return {
    width: androidWindowWidth,
    height: androidWindowHeight
  }
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
    width:getScreenValues().width,
  },
  text:{
    fontSize: 20, 
    color: "#fc5000",
    width: '40%',
    marginTop: 10
  },
  input: {
    width: getScreenValues().width * 0.35,
    height: getScreenValues().height * 0.055,
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

export { Login };
