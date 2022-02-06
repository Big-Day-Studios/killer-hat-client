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
import colors from "../../colors.json"

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Email = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setEmail } = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Name');
  }

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [localVerifyEmail, setLocalVerifyEmail] = useState("")
  const [isEmailEqual, setIsEmailEqual] = useState(false)
  const [isEmailOK, setIsEmailOK] = useState(false)
  const [localEmail, setLocalEmail] = useState("")
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

  function handleNext() {
    navigation.push('Password');
  }

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg);
        }else{
          setEmail(localEmail);
          handleNext();
        }
      }
    setIsLoading(false)
  }

  const validador = (email, verifyEmail) => {
    console.log(email.trim().toLowerCase() === verifyEmail.trim().toLowerCase())
    if(email.trim().toLowerCase() === verifyEmail.trim().toLowerCase()){
      setIsEmailEqual(true)
    }else{
      setIsEmailEqual(false)

    }
  }

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setIsLoading(true)
      console.log(!!localEmail && !!localVerifyEmail)
      if(!!localEmail && !!localVerifyEmail){
        if(isEmailEqual){
          if(isEmailOK){
            await ApiRequest.email(localEmail, setResponse)
          }else{
            setMsg(t("warnings.email.notValid"))
            setIsLoading(false)
          }
        }else{
          setMsg(t("warnings.email.notEqual"))
          setIsLoading(false)
        }
      }else{
        setMsg(t("warnings.missing"))
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
                      color: colors.textPrimaryColor
                    }}>
                      {t("headers.email")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <View style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                    <TextInputNotoSansTC300
                      returnKeyType={"next"}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("signupPages.placeHolderEmail")}
                      onChangeText={( email) => {
                        setLocalEmail(email);
                        setIsEmailOK(validadorEmail(email))
                        validador(localVerifyEmail, email)
                      }} 
                      style={[styles.input]}
                    />
                    <TextInputNotoSansTC300
                      // ref={secondTextInput}
                      style={[styles.input, styles.marginTop]}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("signupPages.placeHolderVerifyEmail")}
                      onChangeText={(verifyEmail) => {
                        setLocalVerifyEmail(verifyEmail)
                        validador(localEmail, verifyEmail)
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
    borderColor: '#000',
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
    position: 'absolute',
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => dispatch({ type: 'SET_EMAIL', payload: { email } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Email);
