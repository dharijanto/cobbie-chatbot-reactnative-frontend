import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  ViewPropTypes,
  EmitterSubscription,
  StyleProp,
  ViewStyle,
} from 'react-native'

import Composer from './Composer'
import Send from './Send'
import Actions from './Actions'
import Color from './Color'
import PreDefinedResponse from './PreDefinedResponse';
import { FrontendResponse, FrontendAction } from './types'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    width: '100%'
    /*
    bottom: 0,
    left: 0,
    right: 0, */
  },
  primary: {
    /* flexDirection: 'row',
    alignItems: 'flex-end', */
  },
  accessory: {
    height: 44,
  },
})

export interface InputToolbarProps {
  options?: { [key: string]: any }
  optionTintColor?: string
  containerStyle?: StyleProp<ViewStyle>
  primaryStyle?: StyleProp<ViewStyle>
  accessoryStyle?: StyleProp<ViewStyle>
  frontendAction?: FrontendAction
  renderAccessory?(props: InputToolbarProps): React.ReactNode
  renderActions?(props: Actions['props']): React.ReactNode
  renderSend?(props: Send['props']): React.ReactNode
  renderComposer?(props: Composer['props']): React.ReactNode
  onPressActionButton?(): void
  onFrontendResponse?(frontendResponse: FrontendResponse): void
}

export default class InputToolbar extends React.Component<
  InputToolbarProps,
  { position: string }
> {
  static defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    frontendAction: null,
    onPressActionButton: () => {},
    onFrontendResponse: () => {}
  }

  static propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    primaryStyle: ViewPropTypes.style,
    accessoryStyle: ViewPropTypes.style,
    frontendAction: PropTypes.object
  }

  state = {
    position: 'absolute',
  }

  keyboardWillShowListener?: EmitterSubscription = undefined
  keyboardWillHideListener?: EmitterSubscription = undefined

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    )
    console.log(`InputToolbar.onPressActionButton(): ${JSON.stringify(this.props.onPressActionButton)}`)
  }

  componentWillUnmount() {
    if (this.keyboardWillShowListener) {
      this.keyboardWillShowListener.remove()
    }
    if (this.keyboardWillHideListener) {
      this.keyboardWillHideListener.remove()
    }
  }

  keyboardWillShow = () => {
    if (this.state.position !== 'relative') {
      this.setState({
        position: 'relative',
      })
    }
  }

  keyboardWillHide = () => {
    if (this.state.position !== 'absolute') {
      this.setState({
        position: 'absolute',
      })
    }
  }

  renderActions() {
    const { containerStyle, ...props } = this.props
    if (this.props.renderActions) {
      return this.props.renderActions(props)
    } else if (this.props.onPressActionButton) {
      return <Actions {...props} />
    }
    return null
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props)
    }
    return <Send {...this.props} />
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props)
    }

    return <Composer {...this.props} />
  }

  test (): any {
    console.log('test')
  }

  onFrontendResponse = (frontendResponse: FrontendResponse): any => {
    if (this.props.onFrontendResponse) {
      return this.props.onFrontendResponse(frontendResponse)
    } else {
      console.error(`[InputToolbar] this.props.onFrontendResponse() is not defined!`)
    }
  }

  renderPreDefinedResponse() {
    const { ...props } = this.props
    return <PreDefinedResponse
              onFrontendResponse={this.onFrontendResponse}
              test={this.test}
              frontendAction={this.props.frontendAction}
           />
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View
        style={
          [
            styles.container,
            /* {
              height: 400
            }, */
            this.props.containerStyle/* ,
            { position: this.state.position }, */
          ] as ViewStyle
        }
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {/* this.renderComposer() */}
          {this.renderPreDefinedResponse()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    )
  }
}
