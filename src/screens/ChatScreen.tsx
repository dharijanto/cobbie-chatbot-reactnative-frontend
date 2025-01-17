import { AppLoading, Asset, Linking } from 'expo'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Platform, Alert } from 'react-native'
import { Bubble, GiftedChat, SystemMessage, IMessage } from '../'

import AccessoryBar from '../example-expo/AccessoryBar'
import CustomActions from '../example-expo/CustomActions'
import CustomView from '../example-expo/CustomView'
import NavBar from '../example-expo/NavBar'
import messagesData from '../example-expo/data/messages'
import earlierMessages from '../example-expo/data/earlierMessages'
import { navigate, navigateWithStack } from '../utils/navigation-helper';
import { NavigationActions } from 'react-navigation';
import cobbieService from '../services/cobbie-service';

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const filterBotMessages = (message: any) =>
  !message.system && message.user && message.user._id && message.user._id === 2
const findStep = (step: any) => (message: any) => message._id === step

const user = {
  _id: 1,
  name: 'Developer',
}

const otherUser = {
  _id: 2,
  name: 'Cobbie'/* ,
  avatar: 'https://facebook.github.io/react/img/logo_og.png', */
}

export interface ChatScreenProps {
  navigation: any
}

export default class App extends Component<ChatScreenProps> {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static defaultProps = {
    navigation: { }
  }

  state = {
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: false,
    isLoadingEarlier: false,
    appIsReady: false,
  }

  _isMounted = false

  componentDidMount() {
    console.log('haha')
    this._isMounted = true
    // init with only system messages
    this.setState({
      messages: [], // messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState: any) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages as any,
              Platform.OS !== 'web',
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1000) // simulating network
  }

  // Here, the message is already formatted
  onFrontendResponse = (message: any) => {
    console.log(`App.onFrontendResponse(): frontendResponse=${JSON.stringify(message)}`)
    this.setState((previousState: any) => {
      const sentMessages = [{ ...message, sent: true, received: false }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        )
      }
    })
    /* const message: any = {
      sent: true,
      received: true
    }
    this.setState((previousState: any) =>
      {
        return {
          messages: GiftedChat.append(previousState.messages, [message]),
        }
      }
    ) */
  }

  onSend = (messages: any[] = []) => {
    const step = this.state.step + 1
    this.setState((previousState: any) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      }
    })
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  }

  botSend = (step = 0) => {
    const newMessage = (messagesData as IMessage[])
      .reverse()
      // .filter(filterBotMessages)
      .find(findStep(step))
    if (newMessage) {
      this.setState((previousState: any) => ({
        messages: GiftedChat.append(
          previousState.messages,
          [newMessage],
          Platform.OS !== 'web',
        ),
      }))
    }
  }

  parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ]
  }

  renderCustomView(props: any) {
    return <CustomView {...props} />
  }

  onReceive = (text: string) => {
    this.setState((previousState: any) => {
      return {
        messages: GiftedChat.append(
          previousState.messages as any,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: otherUser,
            },
          ],
          Platform.OS !== 'web',
        ),
      }
    })
  }

  onSendFromUser = (messages: any[] = []) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />

  renderCustomActions = (props: any) =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    )

  renderBubble = (props: any) => {
    return <Bubble {...props} />
  }

  renderSystemMessage = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  // renderFooter = props => {
  //   if (this.state.typingText) {
  //     return (
  //       <View style={styles.footerContainer}>
  //         <Text style={styles.footerText}>{this.state.typingText}</Text>
  //       </View>
  //     )
  //   }
  //   return null
  // }

  onQuickReply = (replies: any) => {
    const createdAt = new Date()
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ])
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply: any) => reply.title).join(', '),
          user,
        },
      ])
    } else {
      console.warn('replies param is not set correctly')
    }
  }

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

  onProfileClicked = () => {
    console.log('onProfileClicked()')
    const userId = this.props.navigation.getParam('userId', 0)
    cobbieService.getProfileResult(userId).then(resp => {
      if (resp.status && resp.data) {
        navigateWithStack('ProfileScreen', { userId, profile: resp.data })
      } else {
        Alert.alert('Profile could not be retrieved: ' + resp.errMessage)
      }
    }).catch(err => {
      Alert.alert('Failed to retrieve profile result: ' + err.message)
    })
  }

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }
    const { navigation } = this.props
    const userId: number = navigation.getParam('userId', 0)

    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel='main'
        testID='main'
      >
        <NavBar onProfileClicked={this.onProfileClicked} />
        <GiftedChat
          userId={userId}
          messages={this.state.messages}
          onSend={this.onSend}
          onReceive={this.onReceive}
          onFrontendResponse={this.onFrontendResponse}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          parsePatterns={this.parsePatterns}
          user={user}
          scrollToBottom
          onLongPressAvatar={user => Alert.alert(JSON.stringify(user))}
          onPressAvatar={() => {}}
          onQuickReply={this.onQuickReply}
          keyboardShouldPersistTaps='never'
          renderAccessory={Platform.OS === 'web' ? undefined : this.renderAccessory}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          quickReplyStyle={{ borderRadius: 2 }}
          renderQuickReplySend={this.renderQuickReplySend}
          inverted={Platform.OS !== 'web'}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
        />
      </View>
    )
  }
}
