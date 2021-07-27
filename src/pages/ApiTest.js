import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity ,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import ApiRequest from '../services/Api'


function ApiTest() {

    const [state, setState] = useState()
    async function  testRequest(){
      await ApiRequest.loginTest(setState);
      if(!!state){

          console.log("d " + state.TokenValidadeToken);
      }
    }
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={testRequest}></TouchableOpacity>
        <Text style={styles.headerText}>Token:</Text>
        <Text>
        { !!state &&
        state.TokenValidadeToken
        }
        </Text>
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

export { ApiTest };

