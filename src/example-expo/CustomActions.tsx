import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ViewPropTypes,
  StyleProp
} from 'react-native'

import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
} from './mediaUtils'

export interface CustomActionsProps {
  wrapperStyle?: StyleProp<ViewStyle>
  iconTextStyle: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  onSend?({ text }: { text: string }, b: boolean): void
  renderIcon?(): () => ReactNode
}


export default class CustomActions extends React.Component<CustomActionsProps> {
  static defaultProps = {
    onSend: null,
    renderIcon: null,
    wrapperStyle: {},
    iconTextStyle: {},
    containerStyle: {}
  }

  static propTypes = {
    onSend: PropTypes.func,
    renderIcon: PropTypes.func,
    wrapperStyle: ViewPropTypes.style,
    iconTextStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style
  }

  onActionsPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex: any) => {
        const { onSend } = this.props
        switch (buttonIndex) {
          case 0:
            pickImageAsync(onSend)
            return
          case 1:
            takePictureAsync(onSend)
            return
          case 2:
            getLocationAsync(onSend)
          default:
        }
      },
    )
  }

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon()
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
}

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
}
