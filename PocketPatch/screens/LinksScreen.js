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
import { WebBrowser, Audio } from "expo";
import { MonoText } from "../components/StyledText";
import bearImages from "../assets/images/bearImages";

const EXHALE_THRESHOLD = 20;
const INHALE_THRESHOLD = 80;
const UPDATE_INTERVAL = 100;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      pressed: false,
      bearState: "angry",
      isRunning: 0,
      duration: this.props.navigation.state.params.timing[0],
      breathing: false,
      exhaling: true,
      numBreaths: 0,
      successInhale: false,
      successExhale: true,

      bubbleText: "Breathe In"
    };
    this.breatheValue = new Animated.Value(0);
    this.fingerValue = new Animated.Value(0);
    this.point = this.point.bind(this);

    this.timeout;

    this.update = this.update.bind(this);
    this.soundObject = new Audio.Sound();
  }

  async componentDidMount() {
    this.update();
    this.point();
    this.props.navigation.addListener("willBlur", () => this.stopAudio());
    try {
      await this.soundObject.loadAsync(
        require("../assets/audio/background-music.wav")
      );
      await this.soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async stopAudio() {
    try {
      await this.soundObject.unloadAsync();
    } catch (error) {
      console.log(error);
    }
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

  update() {
    if (this.state.progress >= 1) {
      this.props.navigation.navigate("PostBreathing", {
        name: this.props.navigation.state.params.name
      });
      this.setState({ progress: 0 });
      clearTimeout(this.timeout);
    }

    let breatheValue = this.breatheValue.__getValue();
    if (breatheValue) {
      if (this.state.exhaling && breatheValue <= EXHALE_THRESHOLD) {
        this.setState({
          bubbleText: "Breathe In"
        });
      } else if (this.state.breathing && breatheValue >= INHALE_THRESHOLD) {
        this.setState({
          bubbleText: "Breathe Out"
        });
      }

      if (
        this.state.exhaling &&
        !this.state.successExhale &&
        breatheValue <= EXHALE_THRESHOLD
      ) {
        let { numBreaths } = this.state;
        if (this.state.successInhale) {
          this.setState({ progress: this.state.progress + 0.1 });
          numBreaths += 1;
          if (this.state.progress < 0.33) {
            this.setState({
              duration: this.props.navigation.state.params.timing[0]
            });
          } else if (this.state.progress < 0.66) {
            this.setState({
              duration: this.props.navigation.state.params.timing[1]
            });
          } else {
            this.setState({
              duration: this.props.navigation.state.params.timing[2]
            });
          }
        }
        this.setState(
          {
            successInhale: false,
            successExhale: true,
            numBreaths
          },
          () => {
            this.timeout = setTimeout(this.update, UPDATE_INTERVAL);
          }
        );
      } else if (
        this.state.breathing &&
        !this.state.successInhale &&
        breatheValue >= INHALE_THRESHOLD
      ) {
        let successInhale = false;
        if (this.state.successExhale) {
          successInhale = true;
        }
        this.setState(
          {
            successInhale,
            successExhale: false
          },
          () => {
            this.timeout = setTimeout(this.update, UPDATE_INTERVAL);
          }
        );
      } else {
        this.timeout = setTimeout(this.update, UPDATE_INTERVAL);
      }
    } else {
      this.timeout = setTimeout(this.update, UPDATE_INTERVAL);
    }
  }

  async playAudio(file) {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(file);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  breathe() {
    this.playAudio(require("../assets/audio/ocean-inhale-2s.wav"));
    this.setState({ isRunning: 1, breathing: true, exhaling: false });
    Animated.timing(this.breatheValue, {
      toValue: 100,
      duration: this.state.duration,
      easing: Easing.linear
    }).start();
  }

  point() {
    this.fingerValue.setValue(0);
    Animated.timing(this.fingerValue, {
      toValue: 100,
      duration: 1500,
      easing: Easing.linear
    }).start(this.point);
  }

  exhale() {
    this.playAudio(require("../assets/audio/ocean-exhale-2s.wav"));
    this.setState({ breathing: false, exhaling: true });

    Animated.timing(this.breatheValue, {
      toValue: 0,
      duration: this.state.duration,
      easing: Easing.linear
    }).start();
  }

  render() {
    const breathe = this.breatheValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.3]
    });

    const breatheBelly = this.breatheValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.5]
    });

    const breatheLimbs = this.breatheValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.4]
    });

    const fingerX = this.fingerValue.interpolate({
      inputRange: [0, 100],
      outputRange: [-120, -70]
    });

    const fingerY = this.fingerValue.interpolate({
      inputRange: [0, 100],
      outputRange: [80, 150]
    });

    const fingerZ = this.fingerValue.interpolate({
      inputRange: [0, 100],
      outputRange: [2, 1]
    });

    const fingerOpacity = this.fingerValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0.5, 1]
    });

    if (this.state.progress < 0.33) {
      this.state.bearState = "angry";
    } else if (this.state.progress < 0.66) {
      this.state.bearState = "neutral";
    } else {
      this.state.bearState = "calm";
    }

    return (
      <ImageBackground
        source={require("../assets/images/Backdrop.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            flex: 1,
            alignItems: "center"
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
            <View style={styles.bubbleContainer}>
              <Image
                style={
                  this.state.bubbleText === "Breathe In"
                    ? styles.bubble
                    : styles.invisBubble
                }
                source={require("../assets/images/misc/breatheinbubble.png")}
              />
              <Image
                style={
                  this.state.bubbleText !== "Breathe In"
                    ? styles.bubble
                    : styles.invisBubble
                }
                source={require("../assets/images/misc/breatheoutbubble.png")}
              />
            </View>
            <Animated.Image
              style={{
                transform: [{ scale: breathe }],
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: 5
              }}
              //resizeMode="contain"
              source={bearImages[this.state.bearState].face}
            />
            <Animated.Image
              style={{
                transform: [{ scale: breathe }],
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: 4
              }}
              //resizeMode="contain"
              source={bearImages[this.state.bearState].head}
            />
            <Animated.Image
              style={{
                transform: [{ scale: breatheBelly }],
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: 3
              }}
              //resizeMode="contain"
              source={bearImages[this.state.bearState].belly}
            />
            <Animated.Image
              style={{
                transform: [{ scale: breatheLimbs }],
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: 2
              }}
              //resizeMode="contain"
              source={bearImages[this.state.bearState].limb}
            />
            {!this.state.isRunning && (
              <Animated.Image
                style={{
                  bottom: fingerY,
                  right: fingerX,
                  transform: [{ scale: fingerZ }],
                  opacity: fingerOpacity,
                  width: 80,
                  resizeMode: "contain",
                  flex: 1,
                  position: "absolute",
                  zIndex: 5
                }}
                //resizeMode="contain"
                source={require("../assets/images/misc/finger.png")}
              />
            )}
            <Image
              style={{
                transform: [
                  { scale: this.state.bubbleText === "Breathe In" ? 1.3 : 1 }
                ],
                opacity: 0.3,
                tintColor: "gray",
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: -10
              }}
              //resizeMode="contain"
              source={bearImages["neutral"].head}
            />

            <Image
              style={{
                transform: [
                  { scale: this.state.bubbleText === "Breathe In" ? 1.3 : 1 }
                ],
                opacity: 0.3,
                tintColor: "gray",
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: -10
              }}
              //resizeMode="contain"
              source={bearImages["neutral"].belly}
            />
            <Image
              style={{
                transform: [
                  { scale: this.state.bubbleText === "Breathe In" ? 1.3 : 1 }
                ],
                opacity: 0.3,
                tintColor: "gray",
                width: "70%",
                resizeMode: "contain",
                flex: 1,
                position: "absolute",
                zIndex: -10
              }}
              //resizeMode="contain"
              source={bearImages["neutral"].limb}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bubbleContainer: {
    position: "absolute",
    top: 60,
    flex: 1,
    flexDirection: "row"
  },
  bubble: {
    flex: 1,
    resizeMode: "contain",
    height: 100,
    opacity: 1
  },
  invisBubble: {
    flex: 1,
    resizeMode: "contain",
    height: 100,
    opacity: 0
  },
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
    flex: 6
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
