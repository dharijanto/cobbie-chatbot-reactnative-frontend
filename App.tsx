import React, { Component, useContext } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { setNavigation } from './src/utils/navigation-helper'
import { Context as AuthContext, Provider as AuthProvider } from './src/contexts/AuthContext'
import ChatScreen from './src/screens/ChatScreen'
import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import ProfileScreen from './src/screens/ProfileScreen'
// const { state: authState } = useContext<any>(AuthContext)

// const navigator = createStackNavigator({
const navigator = createStackNavigator({
  ChatScreen,
  LoginScreen,
  LoadingScreen,
  ProfileScreen
}, {
  initialRouteName: 'LoadingScreen',
  // initialRouteName: 'TestScreen',
  defaultNavigationOptions: {
    title: 'Cobbie'
  },
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})



const App = createAppContainer(navigator)
export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => setNavigation(navigator) } />
    </AuthProvider>
  )
}
