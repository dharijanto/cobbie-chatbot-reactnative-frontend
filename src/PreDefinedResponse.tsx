import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, TextInput, View, Button } from 'react-native'
import { FrontendAction } from './types';

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
}

export default class PreDefinedResponse extends React.Component<PreDefinedResponseProps> {
  static defaultProps = {
    onButtonPressed: () => {}
  }

  static propTypes = {
    onButtonPressed: PropTypes.func
  }

  onButtonPressed () {

  }

  render() {
    return (
      <View
      style={styles.container}>
        <FlatList
          horizontal={false}
          scrollEnabled={true}
          data={this.props.frontendAction.responses}
          keyExtractor={((_: any, index) => '' + index)}
          renderItem={(({item}) => {
            return (
              <View style={styles.buttonContainer}>
                <Button title={item.text} onPress={() => {}}></Button>
              </View>
            )
          })}

        ></FlatList>
      </View>
    )
  }
}
