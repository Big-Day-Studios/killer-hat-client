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

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Password = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setPassword } = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Email');
  }

  const [msg, setMsg] = useState()
  const [localVerifyPassword, setLocalVerifyPassword] = useState("")
  const [isPasswordEqual, setIsPasswordEqual] = useState(false)
  const [isPasswordOK, setIsPasswordOK] = useState(true)
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const [iconPasswordHide, setIconPasswordHide] = useState("lock")
  const [localPassword, setLocalPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  function handleNext() {
    navigation.push('Birthday');
  }

  const everythingIsOk = async () => {
    setPassword(localPassword);
    handleNext();
  }

  const validador = (password, verifyPassword) => {
    console.log(password.trim().toLowerCase() === verifyPassword.trim().toLowerCase())
    if(password.trim().toLowerCase() === verifyPassword.trim().toLowerCase()){
      setIsPasswordEqual(true)
    }else{
      setIsPasswordEqual(false)

    }
  }

  async function  sendApiRequest(){
    if(!isLoading){
      setIsLoading(true)
      console.log(!!localPassword && !!localVerifyPassword)
      if(!!localPassword && !!localVerifyPassword){
        if(isPasswordEqual){
          if(isPasswordOK){
            everythingIsOk()
          }else{
            setMsg(t("warnings.password.notValid"))
            setIsLoading(false)
          }
        }else{
          setMsg(t("warnings.password.notEqual"))
          setIsLoading(false)
        }
      }else{
        setMsg(t("warnings.missing"))
        setIsLoading(false)
      }
    }
  }

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
                      {t("headers.password")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <View style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                      <View>
                        <TextInputNotoSansTC300
                          returnKeyType={"next"}
                          // onSubmitEditing={handleNextInput}
                          blurOnSubmit={false}
                          placeholderTextColor="#9A9A9A" 
                          placeholder={t("signupPages.placeHolderPass")}
                          onChangeText={( password) => {
                            setLocalPassword(password);
                            // setIsPasswordOK(validadorPassword(password))
                            validador(localVerifyPassword, password)
                          }} 
                          style={[styles.input]}
                          secureTextEntry={isPasswordHide}
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
                              color="#9A9A9A"
                            />
                        </TouchableOpacity>
                      </View>
                     <View style={styles.marginTop}>
                        <TextInputNotoSansTC300
                          placeholderTextColor="#9A9A9A" 
                          placeholder={t("signupPages.placeHolderVerifyPass")}
                          onChangeText={(verifyPassword) => {
                            setLocalVerifyPassword(verifyPassword)
                            validador(localPassword, verifyPassword)
                          }}  
                          onSubmitEditing={sendApiRequest}
                          secureTextEntry={isPasswordHide}
                          style={[styles.input]}
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
                              color="#9A9A9A"
                            />
                        </TouchableOpacity>
                      </View>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPassword: (password) => dispatch({ type: 'SET_PASSWORD', payload: { password } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);
