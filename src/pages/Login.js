import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity ,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ApiRequest from '../services/Api'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Octicons';

function Login() {

  const navigation = useNavigation ();

  function handleNext() {
      navigation.navigate('Patrocinador');
  }

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [userData, setUserData] = useState(
    {
      username: "",
      password: "",
      
    }
  )

  const oldState = userData;

  useEffect(() => {
    if(!!response){
      
      if(response.TokenValidadeToken === "" || response.TokenValidadeToken === undefined){
        setMsg(response.SdtCodRet.CodRetDsd)
      }else{
        setMsg(response.TokenValidadeToken)
        storeData('@lica:user', userData.username)
        storeData('@lica:pass', userData.password)
        storeData('@lica:token', response.TokenValidadeToken)
        handleNext();
      }
    }
  }, [response])
  async function  sendApiRequest(){
    await ApiRequest.login(userData, setResponse);
  }

  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(
        name,
        value
      );
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Platform.OS !== 'web' &&  Keyboard.dismiss }>
          <>
        <Icon
          name={'chevron-left'}
          size={87}
        />

          <View style={styles.container}>

          <Text style={styles.headerText}>Enter your account</Text>

          <Text style={styles.warningText}>{

            !!response  && response.TokenValidadeToken === "" &&
            <>{msg}</>
          }</Text>
          <TextInput id="username"  
            placeholder="email"
            placeholderTextColor="#9A9A9A" 
            onChangeText={( username) => {
              setUserData({ username, password: oldState.password });
            }} 
            style={styles.input}/>
          <TextInput id="password" 
            placeholder="password"
            placeholderTextColor="#9A9A9A"
            onChangeText={(password) => {
              setUserData({username: oldState.username,password})
            }}  
            style={styles.input}/>
          <TouchableOpacity style={styles.button} onPress={sendApiRequest}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText:{
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 35,
    color: 'black',
    fontWeight:  '600'
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  warningText:{
    color: 'red',
    textAlign: 'center',
    width: '65%',
    fontSize: 14
  },
  input: {
    width: '35%',
    borderColor: '#28282888',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    borderWidth: 2,
    paddingVertical: 8,
    paddingLeft: 30,
    borderRadius: 28,
    margin: 10,
    backgroundColor: '#FFFFFF',
    color: '#9A9A9A',
    fontSize: 24
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    paddingTop: 8,
    paddingBottom: 12,
    paddingLeft: 34,
    paddingRight: 36,
    borderRadius: 28,
    margin: 10,
    backgroundColor: '#27AE60',
    color: '#FFFFFF'
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '600',
  }
});

export { Login };