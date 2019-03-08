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

export default class UserInputScreen extends React.Component {
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
            <View style={styles.logo}>
                <Image
                    style={{
                    height: 200,
                    resizeMode: "contain",
                    marginTop: 100,
                    marginBottom: 20
                    }}
                    source={require("../assets/images/start-end-images/logo-01.png")}
                />
            </View>
            <View style={styles.input}>
                <Input placeholder='Name' label="What's your name?" onChangeText={(text) => {this.setState({isDisabled: false}); this.setState({name: text})}}/>
            </View>
            <View style={styles.button}>
                <Button title='GO' 
                buttonStyle={{backgroundColor: '#fff3cf'}} 
                titleStyle={{color: '#ccccff', fontWeight: 'bold'}}
                onPress={() => this.props.navigation.navigate("Home", {name:this.state.name})}
                disabled={this.state.isDisabled}/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#DDDDFF",
    flex: 1,
    justifyContent: 'center'
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
      flexDirection: 'row',
      width: '80%'
  }
});