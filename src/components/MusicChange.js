import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Dimensions, View, TouchableOpacity, StyleSheet } from "react-native";
import { TextModeseven } from './fonts/TextFonts';
import { Icon } from 'react-native-elements';

/* Redux and AsyncStorage */
import { connect } from 'react-redux';

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

const Music = (props) => {
    const { i18n, t } = useTranslation();
    const {playMusic, setPlayMusic } = props
  
    const handleMusicChange = () => {
      if(playMusic) {
        setPlayMusic(false)
      }else{
        setPlayMusic(true)
      }
    }
  
    return (
      <View>
        <TouchableOpacity
          style={[styles.button, styles.chooseItem]}
          onPress={handleMusicChange}
        > 
        {
          !playMusic ?
          <Icon 
            name="music-off"
            type="material"
            color="#9c9c9c"
            style={{
                paddingVertical: 4,
                paddingLeft: 16,
                paddingRight: 6
            }}
            size={39}
          />
          :
          <Icon 
            name="music-note"
            type="material"
            color="#9c9c9c"
            style={{
                paddingVertical: 4,
                paddingLeft: 16,
                paddingRight: 6
            }}
            size={39}
          />
        }
          <TextModeseven style={styles.textStyle}>{t("common.music")}</TextModeseven>
        </TouchableOpacity>
      </View>
    );
};
  
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    chooseItem: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      width: getScreenValues().width,
      height: getScreenValues().height,
  
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    button: {
        borderRadius: 10,
        marginLeft: 10,
    },
    buttonCircle: {
      borderRadius: 30,
      padding: 16,
      margin: 10,
    },
    textStyle:{
      color: "white",
      fontSize: 38,
      alignItems: "center",
      textAlign: "center",
    },
    textStyleLanguage:{
      color: "black",
      fontSize: 23,
      alignItems: "center",
      textAlign: "center",
    },
    textStyleButton:{
      color: "black",
      fontSize: 28,
      alignItems: "center",
      textAlign: "center",
    }
  });
  
  const mapStateToProps = (state) => {
    return {
      playMusic: state.authReducer.playMusic,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setPlayMusic: (playMusic) => dispatch({ type: 'SET_PLAY_MUSIC', payload: { playMusic } }),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Music);