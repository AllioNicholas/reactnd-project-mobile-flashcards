import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/deckAPI'
import ActionButton from './ActionButton'

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
          <Text style={{ color: 'gray', fontSize: 20 }}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <ActionButton
            onPress={() => this.props.navigation.navigate(
                    'NewCard',
                    { deckId: deck.id }
                  )}
            title='Add Card'
            buttonStyle={{ marginBottom: 10, backgroundColor: 'white', borderWidth: .5, borderColor: 'navy' }}
            textStyle={{ color: 'navy'}} />

            <ActionButton
              onPress={() => this.props.navigation.navigate(
                        'StartQuiz',
                        { deckId: deck.id }
                      )}
              disabled={deck.questions.length === 0}
              title='Start Quiz'
              buttonStyle={{ backgroundColor: 'navy' }}
              textStyle={{ color: 'white'}} />
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
