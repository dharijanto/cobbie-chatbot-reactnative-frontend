import React, { Component, useContext } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { setNavigation } from './src/utils/navigation-helper'
import { Context as AuthContext, Provider as AuthProvider } from './src/contexts/AuthContext'
import ChatScreen from './src/screens/ChatScreen'
import LoginScreen from './src/screens/LoginScreen'
import LoadingScreen from './src/screens/LoadingScreen'
// const { state: authState } = useContext<any>(AuthContext)

const navigator = createStackNavigator({
  ChatScreen,
  LoginScreen,
  LoadingScreen
}, {
  initialRouteName: 'LoadingScreen',
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
    <AuthProvider>
      <App ref={(navigator) => setNavigation(navigator) } />
    </AuthProvider>
  )
}
