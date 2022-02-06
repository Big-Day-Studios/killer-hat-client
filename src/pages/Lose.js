import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet } from 'react-native';
/* Redux and AsyncStorage */
import { connect } from 'react-redux';
import colors from "../colors.json";
const { Toast, Root } = require('popup-ui');

const Lose = (props) => {

    const {navigation} =props; 
    useEffect(() => {
        navigation.push("Main")
    }, [5000])
  return (
    <Root>
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/lose.jpg')}
          resizeMode="repeat"

        >
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
        }}>
          </ScrollView>
        </ImageBackground>
    
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
    width: getScreenValues().height *0.28,
    backgroundColor: "#848484",
    borderLeftWidth: 2,
    borderLeftColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
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
    position: 'absolute',
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
  txtLogout: {
    fontSize: getScreenValues().width * 0.03,
    color: colors.textTertiaryColor 
  },
  btnLogout: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonSecondaryColor,
    borderRadius: 1000,
    height: getScreenValues().height * 0.1,
    width: getScreenValues().width * 0.15,
  },
  Items: {
    width: getScreenValues().width * 0.17,
    height: getScreenValues().width * 0.17
  },
  ItemsDisable: {
    width: getScreenValues().width * 0.18,
    height: getScreenValues().width * 0.18
  },
  btnItems: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getScreenValues().height * 0.12,
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lose);