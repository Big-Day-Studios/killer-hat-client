const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC700 } from '../../components/fonts/TextFonts';
import { TextInputNotoSansTC300 } from '../../components/fonts/TextInputFonts';
import { theme } from '../../global/theme';
import ApiRequest from '../../services/Api';
import { CapitalizeFirst } from '../../services/CapitalizeFirst'
import { validadorEmail } from '../../services/validadorEmail';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Name = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Choose');
  }

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [localUsername, setLocalUsername] = useState("")
  const [isNameOK, setIsNameOK] = useState(false)
  const [isEmailOK, setIsEmailOK] = useState(false)
  const [localName, setLocalName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  
  async function  saveName(){
    if(isNameOK !== false){
      setMsg(undefined)
      setName(name);
      next();
    }else{
      errorPopup();
    }
  }

  function handleNext() {
    navigation.push('Choose');
  }

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg)
        }else{
          setUsername(response.username)
          saveName(localName)
          // handleNext()
        }
      }
    setIsLoading(false)
  }

  const validador = ( value ) => {
    if(value){
      const fullName = value.toLowerCase().trim().split(' ')
      let fullNameString = ""
      if(fullName.length > 1){
          setMsg("")
          for(let i = 0; i < fullName.length; i++) {
            fullNameString = fullNameString + CapitalizeFirst(fullName[i].trim()) + " "
          }
          setLocalName(fullNameString.trim())
          setIsNameOK(true)
      }else{
        setIsNameOK(false)
        setMsg(t("warnings.name.fullName"))
      }
    }else{
      setIsNameOK(false)
      setMsg(t("warnings.missing"))
    }
  }

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      validador(localName)
      setIsLoading(true)
      if(isNameOK){
        if(isEmailOK){
          await ApiRequest.email(localUsername, setResponse)
        }else{
          setMsg(t("warnings.email.notValid"))
          setIsLoading(false)
        }
      }else{
        setIsLoading(false)
      }
    }
  }

  // const secondTextInput = useRef(null);

  // function handleNextInput() {
  //   secondTextInput.current.focus();
  // }

  return (
    <Root>   
        <SafeAreaProvider initialMetrics={initialWindowMetrics} style={
          styles.container, 
          {paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right}
        }
        > 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>         
            <View style={[styles.container, styles.center, styles.full]} >
              <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[{
                  flex: 1,
                  alignItems: 'center',
                }, styles.allContainer]}>
                  <View style={[styles.header]}>
                    <TextNotoSansTC700 style={{
                      fontSize: getScreenValues().width * 0.04,
                    }}>
                      {t("headers.name")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <View style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                    <TextInputNotoSansTC300
                      returnKeyType={"next"}
                      // onSubmitEditing={handleNextInput}
                      blurOnSubmit={false}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("signupPages.placeHolderName")}
                      onChangeText={( name) => {
                        setLocalName(name);
                      }} 
                      style={[styles.input]}
                      value={localName}
                    />
                    <TextInputNotoSansTC300
                      // ref={secondTextInput}
                      style={[styles.input, styles.marginTop]}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("loginPage.placeHolderUser")}
                      onChangeText={(username) => {
                        setLocalUsername(username)
                        setIsEmailOK(validadorEmail(username))
                      }}  
                      onSubmitEditing={sendApiRequest}
                    /> 
                  </View>
                  <View style={{
                    backgroundColor: '#00ffff00',
                  }}>
                    <TouchableOpacity style={styles.btnAvancar} onPress={sendApiRequest}>
                      {!isLoading
                        ?
                          <TextNotoSansTC700 style={styles.txtAvancar}>{t("common.nextButton")}</TextNotoSansTC700>
                        :             
                          <View style={[styles.container, styles.center, styles.full]}>
                            <ActivityIndicator color={"#999999"} size="large" />
                          </View>
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaProvider>
        <TouchableOpacity onPress={handleBack} style={{
          elevation: 101,
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '12%'
        }}>
          <View >
            <Icon
              name={"angle-left"}
              type="font-awesome"
              color="#282828"
              size={100}
              style={{ borderRadius:50,   
              shadowColor: "#000",
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
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: getScreenValues().width * 0.036,
    color: '#ffffff' 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
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

export default connect(mapStateToProps, mapDispatchToProps)(Name);
