import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Popup, Root } from 'popup-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import  * as ExtraDimensions from 'react-native-extra-dimensions-android';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC500, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';


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
      email: "",
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
      }else{
        setMsg('Não foi possível acessar o servidor. :(')
        
      }
    }
  }
  
  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setIsLoading(true)
      setResponse(await ApiRequest.login(userData));
      setIsLoading(false);
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
                    onChangeText={( email) => {
                      setUserData({ email, password: oldState.password });
                    }} 
                    style={[styles.input, styles.marginTop]}
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
                      setUserData({email: oldState.email,password})
                    }}  
                    onSubmitEditing={sendApiRequest}
                    secureTextEntry={isPasswordHide}
                  /> 
                    <View style={{
                      position: 'absolute',
                      right: '5%',
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

  const iosWindowWidth = Dimensions.get('window').width
  const iosWindowHeight = Dimensions.get('window').height

  if(iosWindowHeight < iosWindowWidth){
    return {
      width: iosWindowWidth,
      height: iosWindowHeight
    }
  }else{
    return {
      width: iosWindowHeight,
      height: iosWindowWidth
    }
  }
}
const styles = StyleSheet.create({
  marginTop:{
    marginTop: 35
  },
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
    width: getScreenValues().width,
  },
  text:{
    fontSize: 20, 
    color: "#fc5000",
    width: '40%',
    marginTop: 10
  },
  input: {
    width: getScreenValues().width * 0.45,
    height: getScreenValues().height * 0.11,
    paddingLeft: 18,

    alignItems: 'center',
    borderRadius: 20,
    fontSize: 15,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#222222',
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

