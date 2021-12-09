import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Dimensions, View, TouchableOpacity, StyleSheet } from "react-native";
import { TextModeseven } from './fonts/TextFonts';

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

const Htp = () => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { i18n, t } = useTranslation();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        supportedOrientations={['landscape']}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextModeseven style={styles.textStyleLanguage}>Utilizando a tela do celular, derrote o adversário resolvendo os mini games antes que o tempo acabe!</TextModeseven>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TextModeseven style={styles.textStyleButton}>OK</TextModeseven>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.chooseItem]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.buttonCircle}></View>
        <TextModeseven style={styles.textStyle}>{t("common.htp")}</TextModeseven>
      </TouchableOpacity>
    </View>
  );
};

export { Htp };

const Credits = () => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { i18n, t } = useTranslation();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        supportedOrientations={['landscape']}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextModeseven style={styles.textStyleLanguage}>Haru Marcoulakis • Programmer</TextModeseven>
            <TextModeseven style={styles.textStyleLanguage}>Isabela Dias • Desinger</TextModeseven>
            <TextModeseven style={styles.textStyleLanguage}>Arthur Monteiro • Audio and Music Engineer</TextModeseven>
            <TextModeseven style={styles.textStyleLanguage}>Maria Julia Anacleto • Documentation</TextModeseven>
            <TextModeseven style={styles.textStyleLanguage}>Julia Santana • Artist</TextModeseven>
            <TextModeseven style={styles.textStyleLanguage}>João Victor • Audio Engineer</TextModeseven>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TextModeseven style={styles.textStyleButton}>OK</TextModeseven>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.chooseItem]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.buttonCircle}></View>
        <TextModeseven style={styles.textStyle}>{t("common.credits")}</TextModeseven>
      </TouchableOpacity>
    </View>
  );
};

export { Credits };

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
      > {
        playMusic ?
        <Icon 
          name="music-slash"
          type="font-awesome"
          color="#FFFFFF"
          size={39}
        />
        :
        <Icon 
        name="music"
        type="font-awesome"
        color="#FFFFFF"
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
    marginLeft: 20,
  },
  buttonCircle: {
    borderRadius: 30,
    padding: 16,
    margin: 10,
    backgroundColor: "#999999"
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
