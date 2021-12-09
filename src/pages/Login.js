const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, SafeAreaView, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC500, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';
import colors from "../colors.json"

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Login = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Choose');
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
      setMsg()
  }

  useEffect(() => {
    if(!!msg){
      console.log("mggg:  ", msg)
      errorPopup()
    }
  }, [msg])

  const handleVerificator = () =>{
    navigation.push('VerifyEmail');
  }

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg)
        }else{
          if(response.user.first_time){
            handleVerificator();
          }
          console.log(response)
          setToken(response.token)
          setId(response.user._id)
          setFirstTime(response.user.first_time)
          setFriends(response.user.friends)
          setItems(response.user.items)
          setBirthday(response.user.birthday)
          setName(response.user.name)
          setUsername(response.user.username)
          setUser(response.user)
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

  return (
    <Root>  
        <SafeAreaProvider initialMetrics={initialWindowMetrics} style={
          styles.container, 
          {paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,}
        }
        >          
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>         
            <View style={[styles.container, styles.center, styles.full]} >
              <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[styles.container]}>
                  <View style={[{
                    flex: 1,
                    alignItems: 'center',
                  }, styles.allContainer]}>
                    <View style={[styles.header]}>
                      <TextNotoSansTC700 style={{
                        fontSize: getScreenValues().width * 0.04,
                        color: colors.textPrimaryColor
                      }}>
                      {t("headers.login")}
                      </TextNotoSansTC700>
                    </View>
                    <View style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                      <TextInputNotoSansTC300  
                        onSubmitEditing={Keyboard.dismiss}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        placeholderTextColor={colors.textSecondaryColor} 
                        placeholder={t("loginPage.placeHolderUser")}
                        onChangeText={( email) => {
                          setUserData({ email, password: oldState.password });
                        }} 
                        style={[styles.input]}
                        value={userData.email}
                      />
                      <View style={styles.marginTop}>
                        <TextInputNotoSansTC300
                          style={styles.input}
                          placeholderTextColor={colors.textSecondaryColor} 
                          placeholder={t("loginPage.placeHolderPass")}
                          onChangeText={(password) => {
                            setUserData({email: oldState.email,password})
                          }}  
                          onSubmitEditing={sendApiRequest}
                          secureTextEntry={isPasswordHide}
                          value={userData.password}
                        /> 
                        <TouchableOpacity onPress={togglePassword} style={{
                          position: 'absolute',
                          right: '5%',
                          bottom: '25%',
                          elevation: 100,
                          width: '10%',
                          marginBottom: 0

                        }}>
                            <Icon
                              name={iconPasswordHide}
                              type="font-awesome"
                              color={colors.textSecondaryColor}
                            />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{
                      backgroundColor: '#00ffff008',
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
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
        <TouchableOpacity onPress={handleBack} style={{
          elevation: 101,
          position: 'absolute',
          left: '2%',
          top: '0%',
          width: '12%'
        }}>
          <View >
            <Icon
              name={"angle-left"}
              type="font-awesome"
              color={colors.itemsPrimaryColor}
              size={100}
              style={{ borderRadius:50,   
              shadowColor: colors.itemsPrimaryColor,
              shadowOpacity: 0.27,
              shadowRadius: 0,}}
            />
          </View>
        </TouchableOpacity> 
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
    marginTop: 18
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimaryColor
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor: '#ffff0000',
  },
  full: {
    height: getScreenValues().height,
    width: getScreenValues().width,
  },
  inputContainer:{
    backgroundColor: '#ff00ff00',
    marginBottom: getScreenValues().height * 0.05  },
    allContainer:{
      backgroundColor: '#ff000000',
      height: getScreenValues().height * 0.1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  input: {
    width: getScreenValues().width * 0.46,
    height: getScreenValues().height * 0.13,
    paddingLeft: getScreenValues().width * 0.03,
    paddingTop: getScreenValues().height * 0.0158,
    borderRadius: 1000,
    fontSize: getScreenValues().width * 0.027,
    borderColor: "#000",
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.itemsPrimaryColor,
    shadowOpacity: 0.27,
    shadowRadius: 0.25,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    elevation: 6,

  },
  txtAvancar: {
    fontSize: getScreenValues().width * 0.036,
    color: colors.textPrimaryColor 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimaryColor,
    borderRadius: 1000,
    height: getScreenValues().height * 0.15,
    width: getScreenValues().width * 0.2,
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
    setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),
    setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
    setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
    setUsername: (username) => dispatch({ type: 'SET_USERNAME', payload: { username } }),
    setPassword: (password) => dispatch({ type: 'SET_PASSWORD', payload: { password } }),
    setEmail: (email) => dispatch({ type: 'SET_EMAIL', payload: { email } }),
    setFirstTime: (firstTime) => dispatch({ type: 'SET_FIRST_TIME', payload: { firstTime }}),
    setFriends: (friends) => dispatch({ type: 'SET_FRIENDS', payload: { friends }}),
    setItems: (items) => dispatch({ type: 'SET_ITEMS', payload: { items }}),
    setBirthday: (birthday) => dispatch({ type: 'SET_BIRTHDAY', payload: { birthday } }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: { user } }),
    // setFoto: (foto) => dispatch({ type: 'SET_FOTO', payload: { foto } }),
    setResponse: (response) => dispatch({ type: 'SET_RESPONSE', payload: { response } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
