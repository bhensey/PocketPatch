import React from "react";
import {
  Animated,
  Image,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  TouchableHighlight
} from "react-native";
import { WebBrowser } from "expo";
import { Button, Input } from "react-native-elements";

import { MonoText } from "../components/StyledText";

import HistoryTable from "../components/HistoryTable";

export default class HistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        isDisabled: true,
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    console.log("render");

    return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.navigation.getParam("name", "")}'s Mood</Text>
          <HistoryTable></HistoryTable>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: "#DDDDFF",
    flex: 1
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
  },
  logo: {
      flex: 1,
      flexDirection: 'row'
  },
  button: {
      flex: 1,
      width: 250,
      paddingTop: 50
  },
  input: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row'
  }
});