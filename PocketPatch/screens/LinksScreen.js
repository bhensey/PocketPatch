import React from 'react';
import { View, ScrollView, StyleSheet, Text} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as Progress from 'react-native-progress';
import {Icon} from 'react-native-elements';


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
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           <View style={styles.progressBarContainer}>
              <Icon
               style={styles.sadFace}
               name='frowno'
               type='antdesign'
               color="#c06137"
               />
              <Progress.Bar style={styles.progressBar} progress={this.state.progress} color='#5480AF' width={300} margin={5} />
              <Icon
              style={styles.happyFace}
              name='smileo'
              type='antdesign'
              color="#7f4dda"
              />
          </View>
        <Text style={styles.omyMessage}> HELP ME BREATHE, OMY. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff3cf',
  },

  progressBar: {
    borderWidth: 5,
  },

  progressBarContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  omyMessage: {
    marginTop: 425,
    fontSize: 28,
    fontFamily: 'Cochin',
    color: '#5480AF'
  },

  sadFace: {
    marginLeft: 1,
  },

  happyFace: {
    marginRight: 1,
  }
});
