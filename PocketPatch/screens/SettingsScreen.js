import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-elements';
import Confetti from 'react-native-confetti';
import { ExpoConfigView } from '@expo/samples';


export default class SettingsScreen extends React.Component {

  componentDidMount() {
    if (this._confettiView) {
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
      <View style={[styles.container, {backgroundColor: "#ce95f4"}]}>
        <Confetti ref={(node) => this._confettiView = node} duration={4000} timeout={10} confettiCount={500} />
        <Card containerStyle={styles.card} title="Way to go!">
          <View style={styles.cardContent}>

            <Image style={{ width: 300, height: 300 }} source={require('../assets/images/start-end-images/Lotus-02.png')} />
            <Text>You've earned 10 breathing points!</Text>
          </View>
        </Card>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10
  }
});
