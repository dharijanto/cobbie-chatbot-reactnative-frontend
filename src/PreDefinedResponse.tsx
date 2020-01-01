import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, TextInput, View, Button } from 'react-native'
import { FrontendAction, FrontendActionResponse, FrontendResponse } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    fontSize: 16
  },
  buttonContainer : {
    marginBottom: 5
  }
})

export interface PreDefinedResponseProps {
  frontendAction: FrontendAction,
  onButtonPressed(selectionIndex: number): () => {}
  onFrontendResponse(frontendResponse: FrontendResponse): () => {}
  onInputSizeChanged?(text: string): void
  test(): void
}

export default class PreDefinedResponse extends React.Component<PreDefinedResponseProps> {
  static defaultProps = {
    onButtonPressed: () => {},
    onFrontendResponse: () => {},
    onInputSizeChanged: () => {},
    test: () => {}
  }

  static propTypes = {
    onButtonPressed: PropTypes.func,
    onFrontendResponse: PropTypes.func
  }

  componentDidMount () {
    // console.log(`this.props=${JSON.stringify(Object.keys(this.props))}`)
  }

  onFrontendResponse (frontendResponse: FrontendResponse) {
    // console.log('this.props.onInputSizeChanged: ' + JSON.stringify(this.props.onInputSizeChanged))
    if (this.props.onFrontendResponse) {
      // console.log('haha: ' + JSON.stringify(this.props.onFrontendResponse))
      // this.props.test()
      this.props.onFrontendResponse(frontendResponse)
    } else {
      console.error('this.props.onFrontendResponse is not defined!')
    }
  }

  renderButton({item, index}: {item: FrontendActionResponse, index: number}) {
    const props = { ...this.props }
    function onPress () {
      console.log('renderButton().onPress(): this.props=' + JSON.stringify(Object.keys(this.props)))
      const frontendResponse: FrontendResponse = {
        timestamp: new Date().getTime(),
        type: 'button',
        responseIndex: index
      }
      props.onFrontendResponse(frontendResponse)
    }
    return (
      <View style={styles.buttonContainer}>
        <Button title={item.text} onPress={onPress.bind(this)}></Button>
      </View>
    )
  }

  render() {
    // const { onFrontendResponse } = this.props
    return (
      <View
      style={styles.container}>
        <FlatList
          horizontal={false}
          scrollEnabled={true}
          data={this.props.frontendAction.responses}
          keyExtractor={((_: any, index) => '' + index)}
          renderItem={this.renderButton.bind(this)}
        ></FlatList>
        <Button title={'item.text'} onPress={() => this.props.onFrontendResponse({} as any)}/>
      </View>
    )
  }
}
