import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/deckAPI'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `${title}`
    }
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontWeight: 'bold', color: 'navy', fontSize: 25 }} >{deck.title}</Text>
          <Text style={{ color: 'silver', fontSize: 20 }}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: 'white', borderWidth: .5, borderColor: 'navy' }]}
            onPress={() => this.props.navigation.navigate(
                      'NewCard'
                    )} >
            <Text style={[ styles.actionBtnText, { color: 'navy'} ]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: 'navy' }]}
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
    padding: 15,
    justifyContent: 'space-around'
  },
  buttonsContainer: {
    flex: 3
  },
  actionBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10
  },
  actionBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  titleContainer: {
    flex: 3,
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
