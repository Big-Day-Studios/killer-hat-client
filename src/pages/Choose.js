const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextZillaSlabHighlight400, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';
import colors from "../colors.json"
import AsyncStorage from '@react-native-async-storage/async-storage';

const lngs = {
  en: { nativeName: 'English' },
  pt: { nativeName: 'Portugues' }
};

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Choose = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState(false);
  
  function handleSignup(){
    navigation.push('Name');
    
  }

  function handleLogin() {
      navigation.push('Login');
  }

  const handleLanguagles = async () => {
    if(settings){
     setSettings(false)
    }else{
      setSettings(true)
    }
    console.log(await AsyncStorage.getItem("@killer:language"))
  }
  async function handlePortuguese() {
    await storeData("@killer:language", "pt")
  }

  async function handleEnglish () {
    await storeData("@killer:language", "en")
  }

  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(
        name,
        value
      );
      console.log("ok")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(response)
  }, [response])

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCounter] = useState(0);
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
            {
              settings ?
                <View  style={[{
                  flex: 1,
                  alignItems: 'center',
                }, styles.inputContainer]}>
                  <View style={[styles.header]}>
                    <TextNotoSansTC700 style={{
                      fontSize: getScreenValues().width * 0.04,
                      color: colors.textPrimaryColor
                    }}>
                    {t("headers.language")}
                    </TextNotoSansTC700>
                  </View>
                <View style={[styles.container, styles.row]}>

                  <TouchableOpacity style={styles.btnLanguage} onPress={handleEnglish}>
                      {!isLoading
                        ?
                          <TextNotoSansTC700 style={styles.txtAvancar}>English</TextNotoSansTC700>
                        :             
                          <View style={[styles.container, styles.center, styles.full]}>
                            <ActivityIndicator color={"#999999"} size="large" />
                          </View>
                      }
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnLanguage} onPress={handlePortuguese}>
                    {!isLoading
                      ?
                        <TextNotoSansTC700 style={styles.txtAvancar}>Português</TextNotoSansTC700>
                      :             
                        <View style={[styles.container, styles.center, styles.full]}>
                          <ActivityIndicator color={"#999999"} size="large" />
                        </View>
                    }
                  </TouchableOpacity>
                </View>
                </View>

              :
              <View style={[{
                flex: 1,
                alignItems: 'center',
              }, styles.inputContainer]}>
                <TextZillaSlabHighlight400 style={[styles.header]}>
                  {t("common.title")}
                </TextZillaSlabHighlight400>
                <View style={[styles.container, styles.row]}>
                  <TouchableOpacity style={styles.btnAvancar} onPress={handleSignup}>
                      {!isLoading
                        ?
                          <TextNotoSansTC700 style={styles.txtAvancar}>{t("common.signup")}</TextNotoSansTC700>
                        :             
                          <View style={[styles.container, styles.center, styles.full]}>
                            <ActivityIndicator color={"#999999"} size="large" />
                          </View>
                      }
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAvancar} onPress={handleLogin}>
                    {!isLoading
                      ?
                        <TextNotoSansTC700 style={styles.txtAvancar}>{t("common.login")}</TextNotoSansTC700>
                      :             
                        <View style={[styles.container, styles.center, styles.full]}>
                          <ActivityIndicator color={"#999999"} size="large" />
                        </View>
                    }
                  </TouchableOpacity>
                </View>
                
              </View>
            }
            </View>
          </View>
          {/* <TouchableOpacity onPress={handleLanguagles} style={{
            elevation: 101,
            position: 'absolute',
            left: '0%',
            top: '4%',
            width: '12%'
          }}>
          <View>
            <Icon
              name={"cog"}
              type="font-awesome"
              color={colors.textPrimaryColor }
              size={40}
              style={{ borderRadius:50,   
              shadowColor: "#000",
              shadowOpacity: 0.27,
              shadowRadius: 0,}}
            />
          </View>
        </TouchableOpacity>  */}
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
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimaryColor
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: getScreenValues().width * 0.09,
    marginTop: getScreenValues().height * 0.05,
    color: colors.itemsPrimaryColor
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
    marginTop: getScreenValues().height * 0.12, 
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
    fontSize:  getScreenValues().width * 0.034,
    color: colors.textPrimaryColor 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimaryColor,
    borderRadius: 100,
    height: getScreenValues().height * 0.13,
    width: getScreenValues().width * 0.17,
    marginHorizontal: getScreenValues().width * 0.038,
    marginTop: getScreenValues().height * 0.14

  },
  btnLanguage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimaryColor,
    borderRadius: 100,
    height: getScreenValues().height * 0.13,
    width: getScreenValues().width * 0.24,
    marginHorizontal: getScreenValues().width * 0.038,
    marginTop: getScreenValues().height * 0.14

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

export default connect(mapStateToProps, mapDispatchToProps)(Choose);
