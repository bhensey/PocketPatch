import React, { Component } from "react";
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
  TouchableHighlight,

} from "react-native";
import { WebBrowser, Audio } from "expo";
import { Button } from "react-native-elements";
import { MonoText } from "../components/StyledText";

export class Coin extends Component {
  render() {
    return (
      <View>
        <Image
          style={{
            width: undefined,
            height: 50,
            resizeMode: "contain"
          }}
          source={require("../assets/images/finalAssets/coin.png")}
        />
        <View style={{top:0, left:0, right:0, bottom:0, position: "absolute", justifyContent: "center", alignItems: "center"}}>
            <Text>{this.props.coinValue}x</Text>
        </View>
      </View>
    );
  }
}

export class OkFace extends Component {
  render() {
    return (
      <Image
        style={{ width: undefined, height: 100, resizeMode: "contain" }}
        source={require("../assets/images/start-end-images/OK-01-01.png")}
      />
    );
  }
}
export class AngryFace extends Component {
  render() {
    return (
      <Image
        style={{ width: undefined, height: 100, resizeMode: "contain" }}
        source={require("../assets/images/start-end-images/upset-02-02.png")}
      />
    );
  }
}
export class WoundUpFace extends Component {
  render() {
    return (
      <Image
        style={{ width: undefined, height: 100, resizeMode: "contain" }}
        source={require("../assets/images/start-end-images/wound-up-03-03.png")}
      />
    );
  }
}
