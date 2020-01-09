import React, { Component, useEffect, useContext } from 'react'
import { Context as AuthContext } from '../contexts/AuthContext'
import { View, Text } from 'react-native'
import { navigate } from '../utils/navigation-helper';

export default () => {
  const { tryLocalLogin } = useContext<any>(AuthContext)
  useEffect(() => {
    console.log('LoadingScreen...')
    tryLocalLogin().then((resp: any) => {
      console.log('LoadingScreen.tryLocalLogin(): resp=' + JSON.stringify(resp))
      if (resp.status && resp.data) {
        navigate('ChatScreen', { userId: resp.data })
      } else {
        navigate('LoginScreen', {})
      }
    })
  }, [])

  return (
    <View>
      <Text> Hello this is loading screen! </Text>
    </View>
  )
}