import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Toast, Root } from 'popup-ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC500, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';


/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Login = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setPassword, setEmail } = props;
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
      Toast.show({
        type: 'Danger',
        title: 'Error',
        text: msg,
        timing: 2500,
        color: '#e74c3c',
        icon: (
          <View style={{
            position: 'absolute',
            right: '0%',
            bottom: '0%',
          }}>
            <Icon 
            name="times"
            type="font-awesome"
            color="#FFFFFF"
            size={45}
            />
          </View>
        )
      })
      console.log(4444)
  }

  useEffect(() => {
    if(!!msg){
      console.log("mggg:  ", msg)
      errorPopup()
    }
    setMsg(undefined)
  }, [msg])

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg)
        }else{
          setMsg(response.user.username)
        }
      }
      setIsLoading(false)
  }
  
  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setPassword(userData.password)
      setEmail(userData.email)
      setIsLoading(true)
      await ApiRequest.login(userData, setResponse)
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
                    placeholderTextColor="#9A9A9A" 
                    placeholder={t("loginPage.placeHolderPass")}
                    onChangeText={(password) => {
                      setUserData({email: oldState.email,password})
                    }}  
                    onSubmitEditing={sendApiRequest}
                    secureTextEntry={isPasswordHide}
                  /> 
                    <TouchableOpacity onPress={togglePassword} style={{
                      position: 'absolute',
                      right: '5%',
                      bottom: '15%',
                    }}>
                      <View >
                        <Icon
                          name={iconPasswordHide}
                          type="font-awesome"
                          color="#9A9A9A"
                        />
                      </View>
                    </TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
    password: state.authReducer.password,
    response: state.authReducer.response,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch({ type: 'SET_USERNAME', payload: { username } }),
    setPassword: (password) => dispatch({ type: 'SET_PASSWORD', payload: { password } }),
    setEmail: (email) => dispatch({ type: 'SET_EMAIL', payload: { email } }),
    setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),
    setNome: (nome) => dispatch({ type: 'SET_NOME', payload: { nome } }),
    setFoto: (foto) => dispatch({ type: 'SET_FOTO', payload: { foto } }),
    setUserType: (userType) => dispatch({ type: 'SET_USERTYPE', payload: { userType } }),
    setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
    setResponse: (response) => dispatch({ type: 'SET_RESPONSE', payload: { response } }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: { user } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
