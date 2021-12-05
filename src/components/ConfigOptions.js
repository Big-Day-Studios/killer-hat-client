import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { TextModeseven } from './fonts/TextFonts';

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
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TextModeseven style={styles.textStyleLanguage}>OK</TextModeseven>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chooseItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
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
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
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