import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Cane3 from '../assets/cane/cano-3.png';
import CaneCurvo from '../assets/cane/cano-curvo.png';
import CaneReto from '../assets/cane/cano-reto.png';
import Cd from '../assets/icons/cd.png';
import Doc from '../assets/icons/doc.png';
import Note from '../assets/icons/note.png';
import Search from '../assets/icons/search.png';
import Terminal from '../assets/icons/terminal.png';
import Video from '../assets/icons/video.png';
import Ferias from '../assets/popups/ferias.png';
import Free from '../assets/popups/free.png';
import Money from '../assets/popups/money.png';
import Sexy from '../assets/popups/sexy.png';
import colors from "../colors.json";
import { TextNotoSansTC700 } from '../components/fonts/TextFonts';
const { Toast, Root } = require('popup-ui');

const Gameplay = (props) => {

  const [rotateData, setRotateData] = useState({
    a: {
      value: 0,
      timesClicked: -1 
    },
    b: {
      value: 0,
      timesClicked: -1 
    },
    c: {
      value: 0,
      timesClicked: -1 
    },
    d: {
      value: 0,
      timesClicked: -1     
    },
    e: {
      value: 0,
      timesClicked: -1 
    },
    f: {
      value: 0,
      timesClicked: -1     
    },
    g: {
      value: 0,
      timesClicked: -1 
    },
    h: {
      value: 0,
      timesClicked: -1     
    },
    i: {
      value: 0,
      timesClicked: -1 
    },
    j: {
      value: 0,
      timesClicked: -1     
    },
    k: {
      value: 0,
      timesClicked: -1 
    },
    l: {
      value: 0,
      timesClicked: -1     
    },
    m: {
      value: 0,
      timesClicked: -1 
    },
    n: {
      value: 0,
      timesClicked: -1 
    },
    o: {
      value: 0,
      timesClicked: -1  
    },
    p: {
      value: 0,
      timesClicked: -1 
 , }
})
  const [cane, setCane] = useState(false);
  const [showPopup, setShowPopup] = useState({showPopup: false, first: false, second: false, third: false, fourth: false, fifth: false, sixth: false});
  const [timer, setTimer] = useState(300)
  const [visualTimer, setVisualTimer] = useState()
  const [dateString, setDateString] = useState(false)
  const [settings, setSettings] = useState(false);
    
  const oldState = showPopup;

  const {t, i18n} = useTranslation();

  const Win = () =>{


    if(((rotateData.a.timesClicked === 0 || rotateData.a.timesClicked % 2 !== 0)&&((rotateData.b.timesClicked -2) % 4 === 0) &&((rotateData.f.timesClicked +1) % 4 === 0)&&((rotateData.e.timesClicked -1 ) % 4 === 0) &&(rotateData.i.timesClicked === 0 ||rotateData.i.timesClicked % 2 !== 0) &&(rotateData.m.timesClicked % 4 === 0) &&((rotateData.n.timesClicked +1 ) % 4 === 0) &&((rotateData.j.timesClicked -1 ) % 4 === 0) &&((rotateData.k.timesClicked -2) % 4 === 0) &&(rotateData.o.timesClicked % 4 === 0) &&(rotateData.p.timesClicked % 2 === 0))){
      handleWin()
    }  
  }
  const {navigation} = props;
  const insets = useSafeAreaInsets();

  function handleWin() {
      navigation.push('Win');
  }

  const handleLanguagles = async () => {
    if(settings){
     setSettings(false)
    }else{
      setSettings(true)
    }
  }
  const fucnitonn =  (a) => {
    setRotateData({
      ...rotateData,
      a: {
        value: rotateData.a.value + 90,
        timesClicked: rotateData.a.timesClicked + 1
      }
    })
  }
  const handleClickCane = {
    a(){
      Win()
      setRotateData({
        ...rotateData,
        a: {
          value: rotateData.a.value + 90,
          timesClicked: rotateData.a.timesClicked + 1
        }
      })
    },
    b(){
      Win()
      setRotateData({
        ...rotateData,
        b: {
          value: rotateData.b.value + 90,
          timesClicked: rotateData.b.timesClicked + 1
        }
      })
    },
    c(){
      setRotateData({
        ...rotateData,
        c: {
          value: rotateData.c.value + 90,
          timesClicked: rotateData.c.timesClicked + 1
        }
      })
    },
    d(){
      Win()
      setRotateData({
        ...rotateData,
        d: {
          value: rotateData.d.value + 90,
          timesClicked: rotateData.d.timesClicked + 1
        }
      })
    },
    e(){
      Win()
      setRotateData({
        ...rotateData,
        e: {
          value: rotateData.e.value + 90,
          timesClicked: rotateData.e.timesClicked + 1
        }
      })
    },
    f(){
      Win()
      setRotateData({
        ...rotateData,
        f: {
          value: rotateData.f.value + 90,
          timesClicked: rotateData.f.timesClicked + 1
        }
      })
    },
    g(){
      setRotateData({
        ...rotateData,
        g: {
          value: rotateData.g.value + 90,
          timesClicked: rotateData.g.timesClicked + 1
        }
      })
    },
    h(){
      setRotateData({
        ...rotateData,
        h: {
          value: rotateData.h.value + 90,
          timesClicked: rotateData.h.timesClicked + 1
        }
      })
    },
    i(){
      Win()
      setRotateData({
        ...rotateData,
        i: {
          value: rotateData.i.value + 90,
          timesClicked: rotateData.i.timesClicked + 1
        }
      })
    },
    j(){
      Win()
      setRotateData({
        ...rotateData,
        j: {
          value: rotateData.j.value + 90,
          timesClicked: rotateData.j.timesClicked + 1
        }
      })
    },    
    k(){
      Win()
      setRotateData({
        ...rotateData,
        k: {
          value: rotateData.k.value + 90,
          timesClicked: rotateData.k.timesClicked + 1
        }
      })
    },    
    l(){
      Win()
      setRotateData({
        ...rotateData,
        l: {
          value: rotateData.l.value + 90,
          timesClicked: rotateData.l.timesClicked + 1
        }
      })
    },    
    m(){
      Win()
      setRotateData({
        ...rotateData,
        m: {
          value: rotateData.m.value + 90,
          timesClicked: rotateData.m.timesClicked + 1
        }
      })
    },    
    n(){
      Win()
      setRotateData({
        ...rotateData,
        n: {
          value: rotateData.n.value + 90,
          timesClicked: rotateData.n.timesClicked + 1
        }
      })
    },    
    o(){
      Win()
      setRotateData({
        ...rotateData,
        o: {
          value: rotateData.o.value + 90,
          timesClicked: rotateData.o.timesClicked + 1
        }
      })
    },    
    p(){
      Win()
      setRotateData({
        ...rotateData,
        p: {
          value: rotateData.p.value + 90,
          timesClicked: rotateData.p.timesClicked + 1
        }
      })
    }
  }

  setTimeout(() => {
    const time = new Date()

    const seconds = time.getSeconds().toString().length === 1 ? "0" + time.getSeconds().toString() : time.getSeconds().toString()
    const minute = time.getMinutes().toString().length === 1 ? "0" + time.getMinutes().toString() : time.getMinutes().toString()
    const hour = time.getHours().toString().length === 1 ? "0" + time.getHours().toString() : time.getHours().toString()

    const day = time.getDate().toString().length === 1 ? "0" + time.getDate().toString() : time.getDate().toString()
    const month = time.getMonth().toString().length === 1 ? "0" + time.getMonth().toString() : time.getMonth().toString()
    const year = time.getFullYear().toString()

    setDateString(
      hour + ":" + minute + ":" + seconds + "\n" + day + "/" + month + "/" +year
      )

      if(timer === 299){
        setShowPopup({showPopup: true, first: true, second: true, third: true, fouth: true, fifth: true, sixth: true})
      }
      if(timer <= 298){
        if(showPopup.showPopup){
          console.log(!showPopup.first&&!showPopup.second&&!showPopup.third&&!showPopup.fourth&&!showPopup.fifth&&!showPopup.sixth)
          if(!showPopup.first&&!showPopup.second&&!showPopup.third&&!showPopup.fourth&&!showPopup.fifth&&!showPopup.sixth){
            setShowPopup({
              ...oldState,
              showPopup: false  
            })
            setCane(true);
          }
        }
      }
    if(timer >= 0){
      if(timer === 0){
        setTimer(-5)
        handleNext()
      }else{
        const time = new Date(timer * 1000).toISOString().substr(14, 5)
        setVisualTimer(time)
        setTimer(timer - 1)
      }
    }
  }, 1000);

  const handleNext = async () => {
    navigation.push('Lose');
  }

  const first = () => {
    setShowPopup({
      ...oldState,
      first: false
    })
  }

  const second = () => {
    setShowPopup({
      ...oldState,
      second: false
    })
  }

  const third = () => {
    setShowPopup({
      ...oldState,
      third: false
    })
  }

  const fourth = () => {
    setShowPopup({
      ...oldState,
      fourth: false
    })
  }

  const fifth = () => {
    setShowPopup({
      ...oldState,
      fifth: false
    })
  }

  const sixth = () => {
    setShowPopup({
      ...oldState,
      sixth: false
    })
  }

  return (
    <Root>
        <ImageBackground
          style={[styles.background]}
          source={require('../assets/fundo.png')}
          resizeMode="cover"
        >
        <ScrollView >
          <SafeAreaProvider initialMetrics={initialWindowMetrics} style={
            styles.container, 
            {paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,}
          }
          >
            <View>
              <StatusBar style="auto" />
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: getScreenValues().width,
                    height: getScreenValues().height,
                  }}>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: getScreenValues().width,
                    height: getScreenValues().height * 0.12,
                    backgroundColor: "#848484"
                  }}>
                      <TouchableOpacity style={styles.btnItems}>
                        {
                            <Image source={Cd} style={styles.Items} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnItems}>
                        {
                            <Image source={Search} style={{    
                              width: getScreenValues().width * 0.11,
                              height: getScreenValues().width * 0.11}} />
                        }
                      </TouchableOpacity>                    
                      <TouchableOpacity style={styles.btnItems}>
                        {
                            <Image source={Video}  style={{    
                              width: getScreenValues().width * 0.11,
                              height: getScreenValues().width * 0.11,
                              marginTop: getScreenValues().height * 0.04
                            }} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnItems}>
                        {
                            <Image source={Note} style={{    
                              width: getScreenValues().width * 0.10,
                              height: getScreenValues().width * 0.10,
                              marginBottom: getScreenValues().height * 0.03
                            }} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnItems}>
                        {
                            <Image source={Terminal} style={{    
                              width: getScreenValues().width * 0.09,
                              height: getScreenValues().width * 0.09,
                            }} />
                        }
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.icons} >
                      {
                        <TextNotoSansTC700 style={{textAlign: "center"}}>{dateString}</TextNotoSansTC700>
                      }
                    </TouchableOpacity>
                  </View>
                  </View>
            </SafeAreaProvider>
            <View style={{position: "absolute", width: getScreenValues().width, height: getScreenValues().height, top: 0}}>
              <Image source={Doc} style={{    
                width: getScreenValues().width * 0.12,
                height: getScreenValues().width * 0.12,
              }}/>
              <Image source={Doc} style={{    
                width: getScreenValues().width * 0.12,
                height: getScreenValues().width * 0.12,
              }}/>
            </View>
            <View style={{position: "absolute", zIndex:2000, width: getScreenValues().width, height: getScreenValues().height, top: 0, left: getScreenValues().width * 0.83}}>
              <TextNotoSansTC700 style={{color: "#db2222", fontSize: getScreenValues().width * 0.05}}>{visualTimer}</TextNotoSansTC700>
              {        
                showPopup.showPopup && 
                <View>
                  {showPopup.first && 
                    <TouchableOpacity>
                      <Image source={Free}/>
                    </TouchableOpacity>    
                  }
                  {showPopup.second && 
                    <TouchableOpacity>
                      <Image source={Ferias}/>
                    </TouchableOpacity>
                  }
                  {showPopup.third && 
                    <TouchableOpacity>
                      <Image source={Money}/>
                    </TouchableOpacity>
                  }
                  {showPopup.fouth && 
                    <TouchableOpacity>
                      <Image source={Sexy}/>
                    </TouchableOpacity>
                  }
                </View>
              }
            </View>
              {        
                showPopup.showPopup && 
                <View style={{position: "absolute", zIndex:1000, width: getScreenValues().width, height: getScreenValues().height, top: 0}}>
                  {showPopup.first && 
                    <View> 
                    <TouchableOpacity 
                    onPress={first}
                    style={{position: "absolute",  zIndex:1001, top: getScreenValues().height *0.19, left: getScreenValues().width *0.297, width: getScreenValues().width * 0.061, height: getScreenValues().width *0.068}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", width: getScreenValues().width * 0.4, height: getScreenValues().width *0.4}} source={Free}/>
                    </View>
                  }
                  {showPopup.second && 
                    <View> 
                    <TouchableOpacity 
                    onPress={second}
                    style={{position: "absolute",  zIndex:1003, top: getScreenValues().height *0.12, left: getScreenValues().width *0.505, width: getScreenValues().width * 0.058, height: getScreenValues().width *0.058}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", zIndex:1002, left: getScreenValues().width * 0.2, width: getScreenValues().width * 0.4, height: getScreenValues().width *0.4}} source={Ferias}/>
                    </View>
                  }
                  {showPopup.third && 
                    <View> 
                    <TouchableOpacity 
                    onPress={third}
                     style={{position: "absolute",  zIndex:1005, top: getScreenValues().height *0.3, left: getScreenValues().width *0.297, width: getScreenValues().width * 0.065, height: getScreenValues().width *0.068}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", zIndex:1004, top: getScreenValues().height * 0.2, width: getScreenValues().width * 0.4, height: getScreenValues().width *0.4}} source={Money}/>
                    </View>
                  }
                  {showPopup.fourth && 
                    <View> 
                    <TouchableOpacity 
                    onPress={fourth}
                    style={{position: "absolute",  zIndex:1007, top: getScreenValues().height *0.42, left: getScreenValues().width *0.78, width: getScreenValues().width * 0.054, height: getScreenValues().width *0.047}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", zIndex:1006, top: getScreenValues().height * 0.2, left: getScreenValues().width * 0.4, width: getScreenValues().width * 0.5, height: getScreenValues().width *0.5}} source={Sexy}/>
                    </View>
                  }
                  {showPopup.fifth && 
                    <View> 
                    <TouchableOpacity
                    onPress={fifth}
                    style={{position: "absolute",  zIndex:1009, top: getScreenValues().height *0.11 , left: getScreenValues().width *0.59, width: getScreenValues().width * 0.128, height: getScreenValues().width *0.13}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", zIndex:1008, width: getScreenValues().width * 0.8, height: getScreenValues().width *0.5}} source={Free}/>
                    </View>
                  }
                  {showPopup.sixth && 
                    <View> 
                    <TouchableOpacity 
                    onPressIn={sixth}
                    style={{position: "absolute",  zIndex:1011, top: getScreenValues().height *0.09, left: getScreenValues().width *0.73, width: getScreenValues().width * 0.085, height: getScreenValues().width *0.08}}>
                    </TouchableOpacity>    
                      <Image style={{position: "absolute", zIndex:1010,left: getScreenValues().width *0.27, width: getScreenValues().width * 0.6, height: getScreenValues().width *0.5 }} source={Ferias}/>
                    </View>
                  }
                </View>
              }
              {
                cane && 
                  <View style={{position: "absolute",  zIndex:2000, top: getScreenValues().height * 0.12, left: getScreenValues().width * 0.3, width: getScreenValues().width * 0.38, height: getScreenValues().width * 0.38, backgroundColor: "#848484"}}>
                    <View style={{display: "flex", flexDirection: "column",top: getScreenValues().height * 0.08, left: getScreenValues().width * 0.04, width: getScreenValues().width * 0.3, height: getScreenValues().width * 0.3, backgroundColor: "#00000066"}}>
                      <View style={{display: "flex", flexDirection: "row", }}>
                        <TouchableOpacity onPress={handleClickCane.a} >
                          <Image source={CaneReto}  style={[styles.cane, {transform: [{ rotate: rotateData.a.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.b} >
                          <Image source={CaneCurvo} style={[styles.cane, {transform: [{ rotate: rotateData.b.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.c} >
                          <Image source={Cane3}  style={[styles.cane, {transform: [{ rotate: rotateData.c.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.d} >
                          <Image source={Cane3} style={[styles.cane, {transform: [{ rotate: rotateData.d.value + "deg" }],}]}/>
                        </TouchableOpacity>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", }}>
                        <TouchableOpacity onPress={handleClickCane.e} >
                          <Image source={CaneCurvo} style={[styles.cane, {transform: [{ rotate: rotateData.e.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.f} >
                          <Image source={CaneCurvo}  style={[styles.cane, {transform: [{ rotate: rotateData.f.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.g} >
                          <Image source={CaneReto}  style={[styles.cane, {transform: [{ rotate: rotateData.g.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.h} >
                         <Image source={Cane3} style={[styles.cane, {transform: [{ rotate: rotateData.h.value + "deg" }],}]}/>
                        </TouchableOpacity>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", }}>
                        <TouchableOpacity onPress={handleClickCane.i} >
                          <Image source={CaneReto} style={[styles.cane, {transform: [{ rotate: rotateData.i.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.j} >
                          <Image source={CaneCurvo}  style={[styles.cane, {transform: [{ rotate: rotateData.j.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.k} >
                          <Image source={CaneCurvo}  style={[styles.cane, {transform: [{ rotate: rotateData.k.value + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.l} >
                          <Image source={Cane3} style={[styles.cane, {transform: [{ rotate: rotateData.l.value + "deg" }],}]}/>
                        </TouchableOpacity>
                      </View>
                      <View style={{display: "flex", flexDirection: "row", }}>
                        <TouchableOpacity onPress={handleClickCane.m} >
                          <Image source={CaneCurvo} style={[styles.cane, {transform: [{ rotate: rotateData.m.value.toString() + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.n} >
                          <Image source={CaneCurvo}  style={[styles.cane, {transform: [{ rotate: rotateData.n.value.toString() + "deg"}],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.o} >
                          <Image source={CaneCurvo}  style={[styles.cane, {transform: [{ rotate: rotateData.o.value.toString() + "deg" }],}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClickCane.p} >
                          <Image source={CaneReto} style={[styles.cane, {transform: [{ rotate: rotateData.p.value.toString() + "deg" }],}]}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              }
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
  cane: {
    width: getScreenValues().width * 0.075, 
    height: getScreenValues().width * 0.075, 
    backgroundColor: "#00000066"
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



export default Gameplay;