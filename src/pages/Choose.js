const { Toast, Root } = require('popup-ui');
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextZillaSlabHighlight400, TextNotoSansTC700 } from '../components/fonts/TextFonts';
import { theme } from '../global/theme';
import ApiRequest from '../services/Api';


/* Redux and AsyncStorage */
import { connect } from 'react-redux';

const Choose = (props) => {

  const {t, i18n} = useTranslation();

  const { navigation, setId, setToken, setName, setUsername, setPassword, setEmail, setFirstTime, setFriends, setItems, setBirthday, setUser} = props;
  const insets = useSafeAreaInsets();

  
  function handleSignup(){
    navigation.push('Name');
    
  }

  function handleLogin() {
      navigation.push('Login');
  }


  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)

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
  },
  container: {
    flex: 1,
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
    color: "#282828"
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
    fontSize:  getScreenValues().width * 0.034,
    color: '#fff' 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
    borderRadius: 100,
    height: getScreenValues().height * 0.13,
    width: getScreenValues().width * 0.17,
    marginHorizontal: getScreenValues().width * 0.038,
    marginTop: getScreenValues().height * 0.14

  },
});

const mapStateToProps = (state) => {getScreenValues().height * 0.18
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
