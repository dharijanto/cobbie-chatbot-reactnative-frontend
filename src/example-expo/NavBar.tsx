import React from 'react'
import { Button, Text, Platform, TouchableHighlight, View, SafeAreaView, TouchableOpacity } from 'react-native'
import NavBar, { NavTitle, NavButton } from 'react-native-nav'
import Constants from 'expo-constants'

export default function NavBarCustom(props: any) {
  if (Platform.OS === 'web') {
    return null
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5', zIndex: 10 }}>
      <NavBar>
        <NavButton />
        <NavTitle>
          💬 Cobbie - Corporate Buddy {'\n'}
          <Text style={{ fontSize: 10, color: '#aaa' }}>
            Alpha Version - 0.1 (For Internal Demo Only)
          </Text>
        </NavTitle>
        <NavButton />
        <TouchableOpacity onPress={props.onProfileClicked} style={{alignContent: 'center', justifyContent: 'center'}}>
          <Text style={{marginTop: 15, fontWeight: 'bold'}}>Profile</Text>
        </TouchableOpacity>
      </NavBar>
    </SafeAreaView>
  )
}
