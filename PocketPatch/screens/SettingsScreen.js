import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Confetti from 'react-native-confetti';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {

  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
    <View style={styles.container}>
      <Confetti ref={(node) => this._confettiView = node} confettiCount={500}/>
      <Text> Nice job </Text>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});