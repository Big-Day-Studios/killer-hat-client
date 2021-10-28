import React from 'react';
import LottieView from 'lottie-react-native';

export default class BdsLogoAnimation extends React.Component {
  render() {
    return (
      <LottieView
        source={require('../../assets/animations/bds-logo.json')}
        autoPlay
        loop
      />
    );
  }
}