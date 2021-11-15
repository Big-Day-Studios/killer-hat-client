import React, { useEffect, useState } from 'react';
import { Dimensions, Text, Animated, StyleSheet, View } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import BdsLogoAnimatios from '../components/BdsLogoAnimation';
import KillerHatAnimation from '../components/KillerHatAnimation';


import { theme } from '../global/theme';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Splash = ({navigation}) => {

console.log("pixels " + deviceWidth + " x " + deviceHeight)
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
      // fadeOut();
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
        <View initialMetrics={initialWindowMetrics} style={[{ flex:1}]}>
          <Animated.View style={[
            styles.container,{
              opacity
            }
          ]}>
            {turn === 0 
              ?
              <BdsLogoAnimatios style={styles.main}/>
              :
              <KillerHatAnimation style={styles.main}/>
            }
          </Animated.View>
        </View>
  );
}


const styles = StyleSheet.create({
  main:{
    height: deviceHeight,
    width: deviceWidth + deviceWidth, 
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

export { Splash };

