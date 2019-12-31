import React from 'react'
import { Text, Platform, SafeAreaView } from 'react-native'
import NavBar, { NavTitle, NavButton } from 'react-native-nav'
import Constants from 'expo-constants'

export default function NavBarCustom() {
  if (Platform.OS === 'web') {
    return null
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
      <NavBar>
        <NavButton />
        <NavTitle>
          💬 Cobbie - Corporate Buddy {'\n'}
          <Text style={{ fontSize: 10, color: '#aaa' }}>
            Alpha Release - 0.1 (Demo Only)
          </Text>
        </NavTitle>
        <NavButton />
      </NavBar>
    </SafeAreaView>
  )
}
