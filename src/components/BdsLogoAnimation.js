import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BdsLogoAnimation extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      console.log("started")
      this.animation.play();
    }, 1000)
  }

  render() {
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        loop={false}
        source={require('../../assets/animations/bds-logo.json')}
      />
    );
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
});