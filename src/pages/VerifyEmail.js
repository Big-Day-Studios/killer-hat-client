const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC300 ,TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import * as Linking from 'expo-linking';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import colors from "../colors.json"

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const VerifyEmail = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation,  name,  email, password, username , birthday, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Password');
  }


  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [emailCodeLocal, setEmailCodeLocal] = useState(false)

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
  }, [msg])

  function handleNext() {
    navigation.push('Login');
  }

  const responseVerifier = async () => {
    console.log(response)
      if(typeof response === 'object'){
        if(response.error === true){
          console.log(response.reason)
          setMsg(response.reason);
        }else{
          handleNext();
        }
      }
    setIsLoading(false)
  }

  const validador = ( value ) => {
    value=value.replace(/\D/g,"");
    setEmailCodeLocal(value)
  }

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    if(!isLoading){
      setMsg("")
      setIsLoading(true)
      if(emailCodeLocal !== undefined || emailCodeLocal.length === 6){
        await ApiRequest.code(emailCodeLocal, email, setResponse)
      }else{
       setMsg("Código mal digitado");
     }
    }
  }

  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
                      {t("headers.birthday")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <CodeField
                  ref={ref}
                  {...cellProps}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  onChangeText={( name ) => {
                    setEmailCodeLocal( name );
                    validador( name );
                  }}
                  value={emailCodeLocal} 

                  renderCell={({index, symbol, isFocused}) => (
                    <TextNotoSansTC300
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </TextNotoSansTC300>
                  )}
                />
                  <View style={{
                    backgroundColor: '#00ffff00',
                  }}>
                    <TouchableOpacity style={styles.btnAvancar} onPress={sendApiRequest}>
                      {!isLoading
                        ?
                          <TextNotoSansTC700 style={styles.txtAvancar}>Send Code</TextNotoSansTC700>
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
        <TouchableOpacity onPress={handleNext} style={{
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
              color={colors.textPrimaryColor }
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
  item:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScreenValues().height * 0.03,
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
    color: colors.textPrimaryColor 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimaryColor,
    borderRadius: 1000,
    height: getScreenValues().height * 0.15,
    width: getScreenValues().width * 0.26,
  },

  codeFieldRoot: {marginBottom: 30},
  cell: {
    width: getScreenValues().width * 0.08,
    height:  getScreenValues().height * 0.2,
    lineHeight: 70,
    fontSize: getScreenValues().width * 0.06,
    borderWidth: 2,
    borderColor: colors.itemsPrimaryColor,
    color: colors.itemsPrimaryColor,
    textAlign: 'center',
    marginHorizontal: getScreenValues().width * 0.009,
    borderWidth: 2,
    borderRadius: 10,
  },
  focusCell: {
    borderColor: colors.buttonPrimaryColor,
  },
});

const mapStateToProps = (state) => {
  return {
    name : state.authReducer.name,
    email: state.authReducer.email,
    password: state.authReducer.password,
    response: state.authReducer.response,
    username : state.authReducer.username,
    birthday : state.authReducer.birthday,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setId: (id) => dispatch({ type: 'SET_ID', payload: { id } }),
    setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
    setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } }),
    setUsername: (username) => dispatch({ type: 'SET_USERNAME', payload: { username } }),
    setPassword: (password) => dispatch({ type: 'SET_PASSWORD', payload: { password } }),
    setBirthday: (email) => dispatch({ type: 'SET_EMAIL', payload: { email } }),
    setFirstTime: (firstTime) => dispatch({ type: 'SET_FIRST_TIME', payload: { firstTime }}),
    setFriends: (friends) => dispatch({ type: 'SET_FRIENDS', payload: { friends }}),
    setItems: (items) => dispatch({ type: 'SET_ITEMS', payload: { items }}),
    setBirthday: (birthday) => dispatch({ type: 'SET_BIRTHDAY', payload: { birthday } }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: { user } }),
    // setFoto: (foto) => dispatch({ type: 'SET_FOTO', payload: { foto } }),
    setResponse: (response) => dispatch({ type: 'SET_RESPONSE', payload: { response } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
