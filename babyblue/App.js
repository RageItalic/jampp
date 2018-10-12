import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator} from 'react-navigation'
import AuthLoading from './screens/AuthLoading'
import Welcome from './screens/Welcome'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import Settings from './screens/Settings'
import Icon from 'react-native-vector-icons/Ionicons'

/*
App Flow:
  CreateSwitchNavigator - Only show ONE SCREEN/STACK at one time
    1. Loading Screen
    2. Authentication Stack Navigator
      - Auth Welcome Screen
      - SignIn Screen
      - SignUp Screen
    3. App Drawer Navigator
      - App Stack Navigator (To give a common header to the tabs)
        - App Tab Navigator
          - Home Tab
          - Settings Tabs
*/


const AuthStackNavigator = createStackNavigator({
  Welcome,
  SignIn,
  SignUp
})

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "HOME",
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home-outline" color={tintColor} size={24}/>
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: "SETTINGS",
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-settings-outline" color={tintColor} size={24}/>
      )
    }
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
}, {
  drawerLockMode: 'locked-closed'
})

export default createSwitchNavigator({
  AuthLoading,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})