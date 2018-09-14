import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'

class Quiz extends Component {
  state = {
    currentQuestionIndex: 0,
    score: 0,
    showAnswer: false,
    completed: false
  }

  onCorrectAnswer = () => {
    const { deck } = this.props
    const totQuestions = deck.questions.length

    this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        score: prevState.score + 1,
        showAnswer: false,
        completed: prevState.currentQuestionIndex + 1 === totQuestions
      }
    ))
  }

  onWrongAnswer = () => {
    const { deck } = this.props
    const totQuestions = deck.questions.length

    this.setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        showAnswer: false,
        completed: prevState.currentQuestionIndex + 1 === totQuestions
      }
    ))
  }

  flipCard = () => {
    this.setState((prevState) => ({
      ...prevState,
      showAnswer: !prevState.showAnswer
    }))
  }


  render() {
    const { deck } = this.props
    const { showAnswer, currentQuestionIndex, completed } = this.state

    return (
        <View style={styles.container}>
          {completed === true
          ? <View>

          </View>
          : <View style={styles.textContainer}>
            {showAnswer === true
              ? <Text style={styles.textStyle}>
                  Answer
                </Text>
                : <Text style={styles.textStyle}>
                    Question {currentQuestionIndex+1} of {deck.questions.length}
                  </Text>
            }
            </View>
          }
          <View style={styles.buttonsContainer}>
            <ActionButton
              onPress={this.onCorrectAnswer}
              title='Correct'
              buttonStyle={{ marginBottom: 10, backgroundColor: 'green' }}
              textStyle={{ color: 'white'}} />
            <ActionButton
              onPress={this.onWrongAnswer}
              title='Incorrect'
              buttonStyle={{ marginBottom: 20, backgroundColor: 'red' }}
              textStyle={{ color: 'white'}} />
              <ActionButton
                onPress={this.flipCard}
                title={showAnswer == true ? 'Show question' : 'Show answer'}
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
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flex: 3
  },
  textContainer: {
    flex: 2
  },
  textStyle: {
    fontSize: 25,
    color: 'navy',
    textAlign: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
