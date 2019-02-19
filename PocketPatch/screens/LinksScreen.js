import React from "react";
import {
  ImageBackground,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  Image,
  Easing,
  Platform,
  TouchableOpacity,
  PanResponder
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import * as Progress from "react-native-progress";
import { Icon } from "react-native-elements";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, pressed: false };
    this.breatheValue = new Animated.Value(0);

    setInterval(
      () =>
        this.setState(previousState => ({
          progress: this.state.progress + 0.05
        })),
      1000
    );
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      this.setState({ pressed: true });
      this.breathe();
    },
    onPanResponderRelease: (evt, gestureState) => {
      this.setState({ pressed: false });
      this.exhale();
    }
  });
  breathe() {
    /**
     * TODO
     * change duration to dynamic based on speed
     */
    Animated.timing(this.breatheValue, {
      toValue: 100,
      duration: 4000,
      easing: Easing.linear
    }).start();
  }

  exhale() {
    /**
     * TODO
     * change duration to dynamic based on speed
     * change duration to be based on breathe time
     */
    Animated.timing(this.breatheValue, {
      toValue: 0,
      duration: 4000,
      easing: Easing.linear
    }).start();
  }

  render() {
    const breathe = this.breatheValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.5]
    });

    return (
      <ImageBackground
        source={require("../assets/images/Backdrop.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            flex: 1
          }}
        >
          <View style={styles.progressBarContainer}>
            <Icon
              style={styles.sadFace}
              name="frowno"
              type="antdesign"
              color="#c06137"
            />
            <Progress.Bar
              style={styles.progressBar}
              progress={this.state.progress}
              color="#ccccff"
              width={300}
              margin={5}
            />
            <Icon
              style={styles.happyFace}
              name="smileo"
              type="antdesign"
              color="#7f4dda"
            />
          </View>
          <View
            style={styles.bearContainer}
            {...this._panResponder.panHandlers}
          >
            <Animated.Image
              style={{
                transform: [{ scale: breathe }],
                flex: 1,
                width: "70%",
                height: undefined
              }}
              //resizeMode="contain"
              source={require("../assets/images/bear.png")}
            />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff3cf"
  },

  progressBar: {
    borderWidth: 5
  },

  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1
  },

  omyMessage: {
    marginTop: 425,
    fontSize: 28,
    fontFamily: "Cochin",
    color: "#5480AF"
  },

  sadFace: {
    marginLeft: 1
  },

  happyFace: {
    marginRight: 1
  },

  bearContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
