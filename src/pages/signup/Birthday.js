const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextNotoSansTC300 ,TextNotoSansTC700 } from '../../components/fonts/TextFonts';
import { theme } from '../../global/theme';
import ApiRequest from '../../services/Api';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import * as Linking from 'expo-linking';
import colors from "../../colors.json"

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Birthday = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation,  name,  email, password, username , birthday, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  function handleBack() {
      navigation.push('Password');
  }


  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [localBirthday, setLocalBirthday] = useState("")
  const [convertedDateSelected, setConvertedDateSelected] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)




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

  const tof = () => {
    Linking.openURL("https://fervent-golick-51068a.netlify.app/")
  }

  const pp = () => {
    Linking.openURL("https://inspiring-agnesi-993825.netlify.app/")
  }

  useEffect(() => {
    if(!!msg){
      console.log("mggg:  ", msg)
      errorPopup()
    }
  }, [msg])

  function handleNext() {
    navigation.push('Choose');
  }

  const responseVerifier = async () => {
    convertDate();
    if(typeof response === 'object'){
      if(response.error === true){
        setMsg(response.msg);
      }else{
        setBirthday(localBirthday);
        handleNext();
      }
    }
    setIsLoading(false)
  }

  const convertDate = async () => {
    if(!!localBirthday){
      const d = t("signupPages.placeHolderBirthday").split('/');
      const dateSelected = localBirthday.split('/');
      let DD;
      let MM;
      let YYYY;
    
      for (let i = 0; i < d.length; i++) {
        console.log(d[i] + ' ' + i);
        if(d[i] === "DD"){
          DD = dateSelected[i]
        }
         if(d[i] === "MM"){
          MM = dateSelected[i]
        }
         if(d[i] === "YYYY"){
          YYYY = dateSelected[i]
        }
      }

      console.log(DD)
      console.log(MM)
      console.log(YYYY)

      setConvertedDateSelected(YYYY + "-" + MM + "-" + DD)

      console.log("item", convertedDateSelected)
    }
  }


  useEffect(() => {
    responseVerifier();
  }, [response])

  useEffect(() => {
    const data = { 
      name, 
      email,
      password,
      response,
      username,
      birthday: new Date(convertedDateSelected)
    }
    sendApiRequest(data)
  }, [convertedDateSelected])
  async function  sendApiRequest(data){
    if(localBirthday){
      if(!isLoading){
        setIsLoading(true)
        console.log(data)
        console.log(localBirthday)
        if(!!localBirthday){
          if(!!checked){
            await ApiRequest.signup(data, setResponse)
          }else{
            setMsg(t("warnings.acceptTerms"))
            setIsLoading(false)
          }
  
        }else{
          setMsg(t("warnings.missing"))
          setIsLoading(false)
        }
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
                      color: colors.textPrimaryColor
                    }}>
                      {t("headers.birthday")}
                    
                    </TextNotoSansTC700>
                  </View>
                  <TouchableOpacity onPress={() => setOpen(true)} style={ Platform.OS === 'ios' ? [styles.inputContainer, { marginTop: getScreenValues().height * 0.055 }] : [styles.inputContainer]}>
                    <DatePicker
                      showIcon={false} 
                      style={[styles.input]}
                      date={localBirthday}
                      mode="date"
                      placeholder={t("signupPages.placeHolderBirthday")}
                      format={t("signupPages.placeHolderBirthday")}
                      maxDate={moment().subtract(13, 'years').format(t("signupPages.placeHolderBirthday"))}
                      confirmBtnText="OK"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          fontSize: getScreenValues().width * 0.027,
                        },
                      }}
                      onDateChange={(birthday) => {
                        setLocalBirthday(birthday);
                        convertDate()
                      }}
                      placeholderTextColor="#9A9A9A"

                      onConfirm={(birthday) => {
                        responseVerifier();
                        setLocalBirthday(birthday);
                        setOpen(false)
                      }}
                      onCancel={() => {
                        
                        setOpen(false)
                      }}
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => {if(checked){setChecked(false)}else{setChecked(false)}}} style={styles.item}>
                        <RadioButton.Android  
                          onPress={() => {if(checked){setChecked(false)}else{setChecked(true)}}}
                          value={checked} 
                          status={ checked ? 'checked' : 'unchecked' } 
                          color="#27AE60" 
                          uncheckedColor={colors.itemsPrimaryColor}
                        />
                        <TextNotoSansTC300 style={{color: colors.itemsPrimaryColor}}>{t("common.termsAndPolicy.1")}</TextNotoSansTC300>
                        <TouchableOpacity  onPress={tof}><TextNotoSansTC300 style={{color: "#5029f0"}}>{t("common.termsAndPolicy.2")}</TextNotoSansTC300></TouchableOpacity>
                        <TextNotoSansTC300 style={{color: colors.itemsPrimaryColor}}>{t("common.termsAndPolicy.3")}</TextNotoSansTC300>
                        <TouchableOpacity onPress={pp}><TextNotoSansTC300 style={{color: "#5029f0"}}>{t("common.termsAndPolicy.4")}</TextNotoSansTC300></TouchableOpacity>
                      </TouchableOpacity>
                  </View>
                  <View style={{
                    backgroundColor: '#00ffff00',
                  }}>
                    <TouchableOpacity style={styles.btnAvancar} onPress={convertDate}>
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
    color: '#ffffff' 
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

export default connect(mapStateToProps, mapDispatchToProps)(Birthday);
