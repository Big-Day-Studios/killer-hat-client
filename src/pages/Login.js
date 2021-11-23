import { StatusBar } from 'expo-status-bar';
const { Toast, Root } = require('popup-ui');
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
      email: "contato.marcoulakis@gmail.com",
      password: "12345678",
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

  const responseVerifier = async () => {
      if(typeof response === 'object'){
        if(response.error === true){
          setMsg(response.msg)
        }else{
          setToken(response.token)
          setId(response.user._id)
          setEmail(response.user.email)
          setFirstTime(response.user.first_time)
          setFriends(response.user.friends)
          setItems(response.user.items)
          setBirthday(response.user.birthday)
          setPassword(response.user.password)
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
            <View style={[styles.container, styles.center, styles.full]} >
              <View style={[styles.container]}>
                <View style={[{
                  flex: 1,
                  alignItems: 'center',
                }, styles.inputContainer]}>
                <TextNotoSansTC700 style={[styles.header]}>
                Enter your account
                </TextNotoSansTC700>
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
                    flexDirection: 'row',
                    marginTop: 18,
                    marginBottom: 0
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
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom:10
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
              color="#282828"
              size={100}
              style={{ borderRadius:50,   
              shadowColor: "#000",
              shadowOpacity: 0.27,
              shadowRadius: 0,}}
            />
          </View>
        </TouchableOpacity> 
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
    fontSize: getScreenValues().width * 0.04,
    marginTop: getScreenValues().height * 0.05,
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
  inputContainer:{
    marginTop: getScreenValues().height * 0.08, 
    backgroundColor: '#ff000000',
  },
  input: {
    width: getScreenValues().width * 0.46,
    height: getScreenValues().height * 0.13,
    paddingLeft: getScreenValues().width * 0.03,

    alignItems: 'center',
    borderRadius: 1000,
    fontSize: getScreenValues().width * 0.027,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#222222',
    marginTop: 0, 
    marginBottom: 0,
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
    marginBottom: getScreenValues().height * 0.08
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
