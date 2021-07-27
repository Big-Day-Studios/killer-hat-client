import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity ,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ApiRequest from '../services/Api'
import  AsyncStorage  from '@react-native-async-storage/async-storage';

function Patrocinador() {

  const [msg, setMsg] = useState()
  const [response, setResponse] = useState()
  const [search, setSearch] = useState()
  const [token, setToken] = useState()




  useEffect(() => {

    if(!!response){

        setMsg(response.SdtCodRet.CodRetDsd)
      if(response.Patrocinador !== "")
        setMsg(response.SdtCodRet.CodRetDsd)
      }
    
  }, [response])
  async function  sendApiRequest(){

    const localToken = await AsyncStorage.getItem('@lica:token');
    setToken(localToken || '');



    console.log(search);

    if(token === ''){
      const localUser = await AsyncStorage.getItem('@lica:user');
      const localPass = await AsyncStorage.getItem('@lica:pass');


      await ApiRequest.login({
        username: localUser,
        password: localPass
      }, setResponse)

      if(!!response){
      
        if(response.TokenValidadeToken === "" || response.TokenValidadeToken === undefined){
          setMsg(response.SdtCodRet.CodRetDsd)
        }else{
          storeData('@lica:token', response.TokenValidadeToken)
          setToken(response.TokenValidadeToken);
          await ApiRequest.search(token, search, setResponse);
        }
      }
    }else{
      await ApiRequest.search(token, search, setResponse);
    }
    console.log(response)
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Platform.OS !== 'web' &&  Keyboard.dismiss }>
          <View style={styles.container}>

          <Text style={styles.headerText}>Patrocinador</Text>
          <Text>{msg}</Text>
          <TextInput 
            placeholder="search" 
            onChangeText={( search) => {
              setSearch( search );
            }} 
            style={styles.input}/>

          <TouchableOpacity style={styles.button} onPress={sendApiRequest}>
            <Text>Procurar</Text>
          </TouchableOpacity>
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText:{
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 35
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    width: '65%',
    borderColor: '#262626',
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    margin: 10
  },
  button: {
    borderColor: '#262626',
    borderWidth: 1,
    padding: 15,
    borderRadius: 20
  },
});

export { Patrocinador };