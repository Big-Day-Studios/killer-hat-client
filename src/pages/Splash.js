import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Animated, StyleSheet, View } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import BdsLogoAnimatios from '../components/BdsLogoAnimation';
import KillerHatAnimation from '../components/KillerHatAnimation';


import { theme } from '../global/theme';

const Splash = ({navigation}) => {

  const [turn, setTurn] = useState(0)

  const opacity = useState(new Animated.Value(0))[0]

  useEffect(() => {
    loadSplashes()
  }, []);

  const loadSplashes = () =>{
    setTimeout(() => {
      console.log(1)
      fadeIn();
      loadSecondSplash()
    }, 1000)
  }

  const loadSecondSplash = () =>{
    setTimeout(() => {
      console.log(2)
      fadeOut();
      setTimeout(() => {
      console.log(2.1)
        fadeIn();
        setTurn(1);
        final()
      }, 1000)
    }, 4500)
  }

  const final = () => {
    setTimeout(() => {
      console.log("end");
      fadeOut();
      setTimeout(() => {
        console.log("next");
        //next();
      }, 1000)
    }, 5500)
  }

  const loadThirdSplash = () =>{
    setTimeout(() => {
      console.log(2)
      fadeOut();
      setTimeout(() => {
      console.log(2.1)
        fadeIn();
        setTurn(1);
      }, 1000)
    }, 4500)
  }

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }
    
  const next = () => {
    navigation.push('Login');
  }

  return (
        <View initialMetrics={initialWindowMetrics} style={{height: "100%",width: "100%"}}>
          <Animated.View style={[{
            width: "100%",
            height: "100%",
            opacity
          }]}>
            {turn === 0 
              ?
              <BdsLogoAnimatios style={{height: "100%",width: "100%" }}/>
              :
              <KillerHatAnimation style={{height: "105%",width: "105%" }}/>
            }
          </Animated.View>
        </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 40,
  },
  full: {
    height: '100%',
    width: "100%"
  },
  text:{
    fontSize: 20, 
    color: "#fc5000",
    width: '40%',
    marginTop: 10
  },
  input: {
    paddingLeft: 15,
    alignItems: 'center',
    borderRadius: 20,
    fontSize: 15,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: theme.colors.branco,
    color: '#9A9A9A',
    marginTop: 10, 
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
    fontSize: 22,
    color: '#fff' 
  },
  btnAvancar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
    borderRadius: 42,
    height: 57,
    width: 144,
  },
});

export { Splash };

