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
import { Button } from "react-native-elements";

import { MonoText } from "../components/StyledText";

export default class PostBreathingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    console.log("render");

    return (
      <View style={{ flex: 1, backgroundColor: "#DDDDFF", paddingBottom: 50 }}>
        <View style={styles.container}>
          <Text style={{paddingTop: 50, fontSize: 32, paddingBottom: 100, color: "white"}}>
            How are you feeling?
          </Text>
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.navigation.navigate("Settings", {name: this.props.navigation.state.params.name})}
          >
            <View>
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../assets/images/start-end-images/OK-01-01.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.navigation.navigate("Settings", {name: this.props.navigation.state.params.name})}
          >
            <View>
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../assets/images/start-end-images/upset-02-02.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.navigation.navigate("Settings", {name: this.props.navigation.state.params.name})}
          >
            <View>
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../assets/images/start-end-images/wound-up-03-03.png")}
              />
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#DDDDFF",
    flex: 1
  }
});
