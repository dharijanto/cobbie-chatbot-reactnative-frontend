import React, { Component, useEffect, useContext } from 'react'
import { Context as AuthContext } from '../contexts/AuthContext'
import { View, Text } from 'react-native'


export default () => {
  const { tryLocalLogin } = useContext<any>(AuthContext)
  useEffect(() => {
    tryLocalLogin()
  }, [])

  return (
    <View>
      <Text> Hello this is loading screen! </Text>
    </View>
  )
}