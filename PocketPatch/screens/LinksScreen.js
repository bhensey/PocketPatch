import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as Progress from 'react-native-progress';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
   super(props);
   this.state = { progress: 0 };


  setInterval(() => (
    this.setState(previousState => (
      { progress: this.state.progress + .05 }
    ))
  ), 1000);
}

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
          {/*<Image style={styles.sadFace} source={require('./sadface.png')}/>*/}
          <Progress.Bar style={styles.progressBar} progress={this.state.progress} color='#5480AF' width={350} margin={0, 10} />
          {/*<Image style={styles.happyFace} source={require('./happyface.png')} />*/}
          <Text style={styles.omyMessage}> HELP ME BREATHE, OMY. </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#C8E0F4',
  },

  progressBar: {
    borderWidth: 5,
  },

  omyMessage: {
    marginTop: 450,
    fontSize: 30,
    fontFamily: 'Cochin',
    color: '#5480AF'
  },

  sadFace: {
    marginLeft: 0,
  },

  happyFace: {
    marginRight: 0,
  }
});
