import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'

class Quiz extends Component {
  state = {
    currentQuestionIndex: 0,
    score: 0
  }



  render() {
    const { deck } = this.props
    return (
        <View style={styles.container}>
          <ActionButton
            // onPress={}
            title='Correct'
            buttonStyle={{ marginBottom: 10, backgroundColor: 'green' }}
            textStyle={{ color: 'white'}} />
          <ActionButton
            // onPress={}
            title='Incorrect'
            buttonStyle={{ backgroundColor: 'red' }}
            textStyle={{ color: 'white'}} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
