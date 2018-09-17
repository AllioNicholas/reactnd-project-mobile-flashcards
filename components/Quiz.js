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
    const { showAnswer, currentQuestionIndex, completed, score } = this.state
    const percScore = ((score/ deck.questions.length) * 100).toFixed()

    if (completed === true) {
      return (
        <View style={styles.finalScoreContainer}>
            <Text style={[styles.textStyle, { fontSize: 40, marginBottom: 20 }]}>
              You scored:
            </Text>
            <Text style={[styles.textStyle, { fontSize: 75 }]}>
              {percScore}%
            </Text>
            <Text style={[styles.textStyle, { fontSize: 75 }]}>
              {percScore > 60 ? '🎉' : percScore > 30 ? '👍' : '👎'}
            </Text>
          </View>
      )
    }


    const { question, answer } = deck.questions[currentQuestionIndex] !== undefined ? deck.questions[currentQuestionIndex] : {}

    return (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Text style={styles.textStyle}>
              Question {currentQuestionIndex+1} of {deck.questions.length}
            </Text>
            {showAnswer === true
              ? <View style={styles.card}>
                  <Text style={styles.cardText}>
                    {answer}
                  </Text>
                </View>
              : <View style={styles.card}>
                  <Text style={styles.cardText}>
                    {question}
                  </Text>
                </View>
            }
            </View>
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
    flex: 1
  },
  cardContainer: {
    flex: 2
  },
  finalScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 25,
    color: 'navy',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'navy',
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 7,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {
      height: 0,
      width: 0
    },
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'navy'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
