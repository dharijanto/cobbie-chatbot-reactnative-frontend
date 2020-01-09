import React, { Component, useState, useContext, useEffect } from 'react'
import { View, Text, Image, TextInput, TouchableHighlight, StyleSheet, Button } from 'react-native'
import { Context as AuthContext } from '../contexts/AuthContext'
import { navigate } from '../utils/navigation-helper';

export default () => {
  useEffect(() => {
    console.log('LoginScreen...')
  }, [])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { state: authState, login } = useContext<any>(AuthContext)

  const styles = StyleSheet.create({
    mascot: {
      width: 120,
      height: 120,
      marginBottom: 50
    },
    companyLogo: {
      width: 300,
      height: 100,
      marginBottom: 30
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    errMessageContainer: {
      marginBottom: 15
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    registerButton: {
      // backgroundColor: "#99ccff",
      backgroundColor: "grey",
    },
    loginText: {
      color: 'white',
    },
    registerText: {
      color: 'white'
    }
  })

  const onClickListener = (type: string) => {
    switch (type) {
      case 'LOGIN':
      console.log(`login: username=${username} password=${password}`)
      login(username, password).then((resp: any) => {
        if (resp.status && resp.data) {
          navigate('ChatScreen', { userId: resp.data })
        }
      })
      default:
    }
  }

  return (

    <View style={styles.container}>
      <Image source={require('../../media/company-logo.png')} style={styles.companyLogo} resizeMode='contain' />
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
        <TextInput style={styles.inputs}
            placeholder="Username"
            // keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(username) => setUsername(username)}/>
      </View>

      <View style={styles.inputContainer}>
      <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => setPassword(password)}/>
      </View>

      <View style={styles.errMessageContainer}>
        <Text style={{color: 'red'}}> {authState.errMessage} </Text>
      </View>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('LOGIN')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>

      {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
      </TouchableHighlight> */}

      <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => onClickListener('REGISTER')}>
          <Text style={styles.registerText}>Register</Text>
      </TouchableHighlight>
    </View>
  );
}