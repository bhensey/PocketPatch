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


  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          title="Back to Home"
          type="clear"
          onPress={() => navigation.popToTop()}
        />
      )
    };
  };

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.navigation.getParam("name", "")}'s Progress</Text>
          <HistoryTable></HistoryTable>
          <View style={{marginBottom: 15, width:"100%", alignItems:"center"}}>
            <Text>You are on a roll! <Text style={{fontWeight:"bold"}}>5</Text> days of improvement!</Text>
            <Text>7 days total</Text>
            <View>
              <Text>Coin count:</Text>
              <Image
                style={{
                  width: undefined,
                  height: 75,
                  resizeMode: "contain"
                }}
                source={require("../assets/images/finalAssets/coin.png")}
              />
              <View style={{top:25, left:0, right:0, bottom:0, position: "absolute", justifyContent: "center", alignItems: "center"}}>
                  <Text>25x</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#DDDDFF",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: "center"
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
