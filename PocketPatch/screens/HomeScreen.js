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
    console.log("render")

    return (
      <View style={{flex: 1, backgroundColor: "#DDDDFF"}}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Links')}>
          <View>
            <Image style={{width: 250, height: 200}} source={require('../assets/images/start-end-images-compressed/ok-bear-min.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Links')}>
          <View>
            <Image style={{width: 250, height: 200}} source={require('../assets/images/start-end-images-compressed/ok-bear-min.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Links')}>
          <View>
            <Image style={{width: 250, height: 200}} source={require('../assets/images/start-end-images-compressed/ok-bear-min.png')} />
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
  },
});
