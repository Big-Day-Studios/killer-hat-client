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
import Logout from '../services/Logout';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Main = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, token, id, birthday, email, first_time, friends, items, name, password, username, foto} = props;
  const insets = useSafeAreaInsets();

  function handleNext() {
      navigation.push('Logout');
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
         
            console.log(
                token, ' --- \n',
                id, ' --- \n',
                birthday, ' --- \n',
                email, ' --- \n',
                first_time, ' --- \n',
                friends, ' --- \n',
                items, ' --- \n',
                name, ' --- \n',
                password, ' --- \n',
                username, ' --- \n',
                foto, ' --- \n',
                response           
              )
      }
      setIsLoading(false)
  }
  
  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    handleNext()
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
            <StatusBar style="auto" />
            <View style={[styles.container, styles.center, styles.full]} >
              <View style={[styles.container]}>
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <TextNotoSansTC700 >
                    {  "{\n" +
                        JSON.stringify(id) + ', \n' +
                        JSON.stringify(birthday) + ', \n' +
                        JSON.stringify(email) + ', \n' +
                        JSON.stringify(first_time) + ', \n' +
                        JSON.stringify(friends) + ', \n' +
                        JSON.stringify(items) + ', \n' +
                        JSON.stringify(name) + ', \n' +
                        JSON.stringify(username) + ', \n'+
                        "}"  
                    }
                </TextNotoSansTC700>
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
                        <TextNotoSansTC500 style={styles.txtAvancar}>{t("common.logoutButton")}</TextNotoSansTC500>
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
    token: state.authReducer.token,
    id: state.authReducer.id,
    birthday: state.authReducer.birthday,
    email: state.authReducer.email,
    first_time: state.authReducer.first_time,
    friends: state.authReducer.friends,
    items: state.authReducer.items,
    name: state.authReducer.name,
    password: state.authReducer.password,
    username: state.authReducer.username,
    foto: state.authReducer.foto,
    response: state.authReducer.response
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);