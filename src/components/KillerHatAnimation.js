import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default class KillerHatAnimation extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      console.log("started")
      this.animation.play();
    }, 1000)
  }

  render() {
    if(this.props.scale === undefined){
      return (<Text style={styles.error}>Param scale is undefined!</Text>)
    }else{ 
      const scale = Math.round(this.props.scale * 10) / 10;
      if(scale < 18 ){
        return (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../assets/animations/killer-hat-splash/killer-hat-splash.json')}
          />
        );
      }else if( scale < 19.5 ){
        return (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../assets/animations/killer-hat-splash/killer-hat-splash-18-9.json')}
          />
        );
      }else if( scale < 21 ){
        return (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../assets/animations/killer-hat-splash/killer-hat-splash-19_5-9.json')}
          />
        );
      }else if( scale < 22 ){
        return (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../assets/animations/killer-hat-splash/killer-hat-splash-21-9.json')}
          />
        );
      }else{
        return (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../../assets/animations/killer-hat-splash/killer-hat-splash-22-9.json')}
          />
        );
      }
    }

  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 50
  }
});