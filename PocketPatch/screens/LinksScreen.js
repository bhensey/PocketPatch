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
      { progress: this.state.progress + .1 }
    ))
  ), 1000);
}

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
          <Text>Hello</Text>

          <Progress.Bar progress={this.state.progress} width={200} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
