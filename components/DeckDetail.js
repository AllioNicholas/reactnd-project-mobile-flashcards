import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/deckAPI'

class DeckDetail extends Component {


  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
                      'NewCard'
                    )} >
            <Text style={[ styles.actionBtnText, { color: 'navy'} ]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
                      'StartQuiz'
                    )} >
            <Text style={[ styles.actionBtnText, { color: 'white'} ]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  iosActionBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'navy',
  },
  AndroidActionBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'navy'
  },
  actionBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetail)
