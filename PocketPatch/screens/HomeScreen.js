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
  PanResponder
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

const EXHALE_THRESHOLD = 20
const INHALE_THRESHOLD = 80
const UPDATE_INTERVAL = 100

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,

      breathing: false,
      exhaling: false,
      numBreaths: 0,
      successInhale: false,
      successExhale: true
    };
    this.breatheValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.update()
  }

  static navigationOptions = {
    header: null
  };

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

  /**
   * Checks state of breathing and if necessary, updates the flags.
   */
  update() {
    if (this.state.exhaling && this.breatheValue <= EXHALE_THRESHOLD) {
      let { numBreaths } = this.state
      if (this.state.successInhale) {
        numBreaths += 1
      }
      this.setState({
        successInhale: false,
        successExhale: true,
        numBreaths
      }, () => {
        setTimeout(this.update, UPDATE_INTERVAL)
      })
    } else if (this.state.exhaling && this.breatheValue >= INHALE_THRESHOLD) {
      let successInhale = false
      if (this.state.successExhale) {
        successInhale = true
      }
      this.setState({
        successInhale,
        successExhale: false
      }, () => {
        setTimeout(this.update, UPDATE_INTERVAL)
      })
    }
  }

  breathe() {
    /**
     * TODO
     * change duration to dynamic based on speed
     */
    this.setState({
      breathing: true,
      exhaling: false
    }, () => {
      Animated.timing(this.breatheValue, {
        toValue: 100,
        duration: 4000,
        easing: Easing.linear
      }).start();
    })
  }

  exhale() {
    /**
     * TODO
     * change duration to dynamic based on speed
     * change duration to be based on breathe time
     */
    this.setState({
      breathing: false,
      exhaling: true
    }, () => {
      Animated.timing(this.breatheValue, {
        toValue: 0,
        duration: 4000,
        easing: Easing.linear
      }).start();
    })
  }

  render() {
    const breathe = this.breatheValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.5]
    });

    return (
      <View
        style={this.state.pressed ? styles.containerPressed : styles.container}
        {...this._panResponder.panHandlers}
      >
        <Animated.Image
          style={{
            transform: [{ scale: breathe }],
            flex: 1,
            width: "75%",
            height: undefined
          }}
          resizeMode="contain"
          source={require("../assets/images/angry/small.png")}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff"
  },
  containerPressed: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
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
