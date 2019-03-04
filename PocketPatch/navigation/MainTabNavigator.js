import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import PostBreathingScreen from "../screens/PostBreathingScreen"
import SettingsScreen from "../screens/SettingsScreen";

export default createStackNavigator(
  {
    Home: HomeScreen,
    Links: LinksScreen,
    PostBreathing: PostBreathingScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Home"
  }
);
