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
import { WebBrowser, Audio } from "expo";
import { Button } from "react-native-elements";
import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio();
  }

  async playAudio() {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(
        require("../assets/audio/background-music.wav")
      );
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#DDDDFF", paddingBottom: 50 }}>
        <View style={styles.container}>
          <Button
            title="Go Back"
            buttonStyle={{ backgroundColor: "#fff3cf" }}
            titleStyle={{ color: "#ccccff", fontWeight: "bold" }}
            onPress={() => this.props.navigation.navigate("UserInput")}
          />
          <Image
            style={{
              height: 200,
              resizeMode: "contain",
              marginTop: 100,
              marginBottom: 20
            }}
            source={require("../assets/images/start-end-images/logo-01.png")}
          />
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.props.navigation.navigate("Links")}
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
            onPress={() => this.props.navigation.navigate("Links")}
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
            onPress={() => this.props.navigation.navigate("Links")}
          >
            <View>
              <Image
                style={{ height: 100, resizeMode: "contain" }}
                source={require("../assets/images/start-end-images/wound-up-03-03.png")}
              />
            </View>
          </TouchableOpacity>
          {/*<Button
            buttonStyle= {{width: 150, backgroundColor: 'red'}}
            title="Angry"
            onPress={() => this.props.navigation.navigate('Links')}
           >
          </Button>
          <Button
            buttonStyle= {{width: 150, backgroundColor: 'purple'}}
            title="Sad"
            onPress={() => this.props.navigation.navigate('Links')}
           >
          </Button>
          <Button
            buttonStyle= {{width: 150, backgroundColor: 'green'}}
            title="Excited"
            onPress={() => this.props.navigation.navigate('Links')}
           >
          </Button>*/}
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
