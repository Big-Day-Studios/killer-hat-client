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
import colors from "../../colors.json"

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Name = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setName, setUsername, name, username} = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Choose');
  }

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isNameOK, setIsNameOK] = useState(false)
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
      setMsg("")
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
    }else{
      errorPopup();
    }
  }

  function handleNext() {
    navigation.push('Email');
  }

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg)
        }else{
          setUsername(response.username)
          saveName();
          handleNext();

        }
      }
    setIsLoading(false)
  }

  const validador = ( value ) => {
    console.log(value)
    if(value){
      const fullName = value.toLowerCase().trim().split(' ')
      let fullNameString = ""
      if(fullName.length > 1){
          setMsg("")
          for(let i = 0; i < fullName.length; i++) {
            fullNameString = fullNameString + CapitalizeFirst(fullName[i].trim()) + " "
          }
          setName(fullNameString.trim())
          setIsNameOK(true)
      }else{
        setIsNameOK(false)
      }
    }
  }

  useEffect(() => {
    validador(name);
  }, [name])

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setIsLoading(true)
      if(isNameOK){
          await ApiRequest.username(username, setResponse)
      }else if(!name){
        setIsNameOK(false)
        setMsg(t("warnings.missing"))
        setIsLoading(false)
      }else{
        setIsNameOK(false)
        setMsg(t("warnings.name.fullName"))
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
                      {t("headers.name")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <View style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                    <TextInputNotoSansTC300
                      returnKeyType={"next"}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("signupPages.placeHolderName")}
                      onChangeText={(name) => {
                        setName(name);
                      }} 
                      style={[styles.input]}
                      value={name}
                    />
                    <TextInputNotoSansTC300
                      // ref={secondTextInput}
                      style={[styles.input, styles.marginTop]}
                      placeholderTextColor="#9A9A9A" 
                      placeholder={t("signupPages.placeHolderUser")}
                      onChangeText={(username) => {
                        setUsername(username)
                      }}  
                      value={username}
                      onSubmitEditing={(username) => {
                        setUsername(username)
                        sendApiRequest()
                      }}
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
    marginBottom: getScreenValues().height * 0.05  
  },
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
    borderRadius: 100,
    height: getScreenValues().height * 0.15,
    width: getScreenValues().width * 0.2,
  },
});

const mapStateToProps = (state) => {
  return {
    name: state.authReducer.name,
    username: state.authReducer.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
    setUsername: (username) => dispatch({ type: 'SET_USERNAME', payload: { username } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Name);
