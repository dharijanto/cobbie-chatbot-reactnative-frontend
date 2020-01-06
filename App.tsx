import { AppLoading, Asset, Linking } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Bubble, GiftedChat, SystemMessage, IMessage, FrontendResponse } from './src'

import ChatScreen from './src/screens/ChatScreen'
import AccessoryBar from './src/example-expo/AccessoryBar'
import CustomActions from './src/example-expo/CustomActions'
import CustomView from './src/example-expo/CustomView'
import NavBar from './src/example-expo/NavBar'
import messagesData from './src/example-expo/data/messages'
import earlierMessages from './src/example-expo/data/earlierMessages'

const navigator = createStackNavigator({
  ChatScreen
}, {
  initialRouteName: 'ChatScreen',
  // initialRouteName: 'TestScreen',
  defaultNavigationOptions: {
    title: 'Filoshopy CMS'
  },
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})



const App = createAppContainer(navigator)
export default () => {
  return (
    <App/>
  )
}
