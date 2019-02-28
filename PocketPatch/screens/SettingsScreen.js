import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements';
import Confetti from 'react-native-confetti';
import { ExpoConfigView } from '@expo/samples';


export default class SettingsScreen extends React.Component {

  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button 
          title="Back to Home" 
          type="clear"
          onPress={() => navigation.popToTop()}

        /> 

      )
    }
  };

  render() {
    return (
    <View style={styles.container}>
      <Confetti ref={(node) => this._confettiView = node} confettiCount={500}/>

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
