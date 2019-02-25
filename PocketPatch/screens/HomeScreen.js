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
import {Button} from 'react-native-elements';

import { MonoText } from "../components/StyledText";


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  static navigationOptions = {
    header: null
  };

 
  render() {

    return (
      <View style={{flex: 1}}>
        <View style={styles.padding}>
          <Text> updawg?</Text>
        </View>
        <View style={styles.container}>
          <Button 
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
          </Button>
        </View>
        <View style={styles.padding}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  padding : {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 9,
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
