
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { TextModeseven } from './fonts/TextFonts';


const LanguagePicker = () => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const { i18n, t } = useTranslation();

  const languages = [
    { name: "pt", label: "Português" },
    { name: "en", label: "English" },
  ];

  const LanguageItem = ({ name, label }) => (
    <TouchableOpacity
      style={styles.buttonLanguage}
      onPress={() => {
        i18n.changeLanguage(name);
        setModalVisible(!modalVisible);
      }}
    >
      <TextModeseven style={styles.textStyleLanguage}>{label}</TextModeseven>
    </TouchableOpacity>
  );

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
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.chooseItem]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.buttonCircle}></View>
        <TextModeseven style={styles.textStyle} >{t("common.language")}</TextModeseven>
      </TouchableOpacity>
    </View>
  );
};

export default LanguagePicker;

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
    padding: 80,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonLanguage: {
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
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
    fontSize: 38,
    alignItems: "center",
    textAlign: "center",
  }
});