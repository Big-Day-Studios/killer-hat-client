import { StatusBar } from 'expo-status-bar';
const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, ImageBackground, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextModeseven, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { TextInputNotoSansTC300 } from '../components/fonts/TextInputFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';
import Logout from '../services/Logout';
import colors from "../colors.json"
import LanguagePicker from '../components/LanguagePicker'
import { Htp, Credits } from '../components/ConfigOptions'
import Music from '../components/MusicChange'
import Sound from '../components/SoundChange'



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
  const [settings, setSettings] = useState(false);
  
  const [userData, setUserData] = useState(
    {
      email: "contato.marcoulakis@gmail.com",
      password: "12345678",
    }
  )


  const oldState = userData;

  const handleLanguagles = async () => {
    if(settings){
     setSettings(false)
    }else{
      setSettings(true)
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

  const WarningPopup = () => {
    Toast.show({
      title: 'Warning',
      text: msg,
      timing: 2500,
      color: "#edda07",
      icon: (
        <View style={{
          position: 'absolute',
          right: '0%',
          bottom: '0%',
        }}>
          <Icon 
          name="exclamation-triangle"
          type="font-awesome"
          color="#FFFFFF"
          size={39}
          />
        </View>
      )
    })
    console.log(555)
    setMsg()
  }

  useEffect(() => {
    if(!!msg){
      console.log("mggg:  ", msg)
      WarningPopup()
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
  

  const disbledItem = () => {
    setMsg("This functionality will be available soon!")
  }

  useEffect(() => {
    responseVerifier();
  }, [response])

  async function  sendApiRequest(){
    handleNext()
  }

  return (
    <Root>
      {
        !settings ?
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/lobby.png')}
          resizeMode="cover"
        >
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
            <View>
              <StatusBar style="auto" />
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: 10,
                    width: getScreenValues().width,
                  }}>
                    <TouchableOpacity style={styles.icons} onPress={disbledItem}>
                      {
                          <Image 
                            style={styles.icons}        
                            source={require('../assets/icons/friends.png')}
                          />
                      }
                    </TouchableOpacity>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: getScreenValues().width,
                  }}>
                      <TouchableOpacity style={styles.btnItems} onPress={console.log('lobby')}>
                        {
                            <TextModeseven style={styles.txtItems}>{t("lobbyPage.lobby")}</TextModeseven>
                        }
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnItemsDisable} onPress={disbledItem}>
                        {
                            <TextModeseven style={styles.txtItemsDisable}>{t("lobbyPage.store")}</TextModeseven>
                        }
                      </TouchableOpacity>                    
                      <TouchableOpacity style={styles.btnItemsDisable} onPress={disbledItem}>
                        {
                            <TextModeseven style={styles.txtItemsDisable}>{t("lobbyPage.themes")}</TextModeseven>
                        }
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnItemsDisable} onPress={disbledItem}>
                        {
                            <TextModeseven style={styles.txtItemsDisable}>{t("lobbyPage.items")}</TextModeseven>
                        }
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.icons} onPress={handleLanguagles}>
                      {
                          <Image 
                            style={styles.icons}        
                            source={require('../assets/icons/settings.png')}
                          />
                      }
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingBottom: 10,
                    paddingRight: 15,
                    width: getScreenValues().width,
                  }}>
                    <TouchableOpacity style={styles.btnAvancar} onPress={sendApiRequest}>
                      {!isLoading
                        ?
                          <TextModeseven style={styles.txtAvancar}>{t("common.play")}</TextModeseven>
                        :             
                          <View style={[styles.container, styles.center, styles.full]}>
                            <ActivityIndicator color={"#999999"} size="large" />
                          </View>
                      }
                    </TouchableOpacity>
                  </View>
            </SafeAreaProvider>
          </ScrollView>
        </ImageBackground>
        :
        <ImageBackground
        blurRadius={30}
        style={[styles.background]}
        source={require('../assets/lobby.png')}
        resizeMode="cover"
      >
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
            <View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: getScreenValues().height *0.15,
                width: getScreenValues().width,
                marginBottom: 10
              }}>
                <TouchableOpacity style={styles.backIcon} onPress={handleLanguagles}>
                <Icon
                  name={"angle-left"}
                  type="font-awesome"
                  color={colors.itemsPrimaryColor}
                  size={getScreenValues().height *0.25}
                  style={{ borderRadius:50,   
                  shadowColor: colors.itemsPrimaryColor,
                  shadowOpacity: 0.27,
                  shadowRadius: 0,}}
                />
                </TouchableOpacity>
              </View>
            </View>
              <View style={{

              }}>
                <View style={{marginTop: 25, marginLeft: 15}}>
                  <Music/>
                  <Sound/>
                  <LanguagePicker/>
                  <Htp/>
                  <Credits/>
                </View>
              </View>
          </SafeAreaProvider>
        </ScrollView>
      </ImageBackground>
      } 
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
  background:{
    height: getScreenValues().height,
    width: getScreenValues().width,
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  header:{
    backgroundColor: '#ffff0000',
  },
  full: {
    height: getScreenValues().height,
    width: getScreenValues().width,
  },
  icons:{
    height: getScreenValues().height *0.12,
    width: getScreenValues().height *0.12,
  },
  backIcon:{
    height: getScreenValues().height *0.25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 10,
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
    fontSize: getScreenValues().width * 0.07,
    color: colors.textTertiaryColor 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonSecondaryColor,
    borderRadius: 1000,
    height: getScreenValues().height * 0.2,
    width: getScreenValues().width * 0.3,
  },
  txtItems: {
    fontSize: getScreenValues().width * 0.03,
    color: colors.textTertiaryColor 
  },
  txtItemsDisable: {
    fontSize: getScreenValues().width * 0.03,
    color: colors.textTertiaryColor + "33"
  },
  btnItems: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonSecondaryColor,
    borderRadius: 1000,
    marginHorizontal: 5,
    height: getScreenValues().height * 0.09,
    width: getScreenValues().width * 0.15,
  },
  btnItemsDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonSecondaryColor + "55",
    borderRadius: 1000,
    marginHorizontal: 5,
    height: getScreenValues().height * 0.09,
    width: getScreenValues().width * 0.15,
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