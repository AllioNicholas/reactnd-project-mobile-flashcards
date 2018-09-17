import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'

class Quiz extends Component {
  state = {
    currentQuestionIndex: 0,
    score: 0,
    showAnswer: false,
    completed: false,
    squeezValue: new Animated.Value(1),
    animatedAlpha: new Animated.Value(1)
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
    const { squeezValue, animatedAlpha } = this.state
    Animated.sequence([
        Animated.timing(animatedAlpha, { toValue: 0.0, duration: 0}),
        Animated.timing(squeezValue, { toValue: 0.04, duration: 200}),
        Animated.timing(animatedAlpha, { toValue: 1.0, duration: 0}),
        Animated.timing(squeezValue, { toValue: 1.0, duration: 200}),
        Animated.spring(squeezValue, { toValue: 1, friction: 4})
    ]).start()

    this.setState((prevState) => ({
      ...prevState,
      showAnswer: !prevState.showAnswer
    }))
  }

  restartQuiz = () => {
    this.setState(() => ({
        currentQuestionIndex: 0,
        score: 0,
        showAnswer: false,
        completed: false
    }))
  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { deck } = this.props
    const { showAnswer, currentQuestionIndex, completed, score, squeezValue, animatedAlpha } = this.state
    const percScore = ((score/ deck.questions.length) * 100).toFixed()

    if (completed === true) {
      return (
        <View style={styles.finalScoreContainer}>
          <View style={styles.scoreTextContainer}>
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
          <View style={styles.buttonsContainer}>
            <ActionButton
              onPress={this.restartQuiz}
              title='Restart quiz'
              buttonStyle={{ marginBottom: 10, backgroundColor: 'navy' }}
              textStyle={{ color: 'white'}} />
            <ActionButton
              onPress={this.backToDeck}
              title='Back to Deck'
              buttonStyle={{ backgroundColor: 'navy' }}
              textStyle={{ color: 'white'}} />
          </View>
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
              ? <Animated.View style={[styles.card, { transform : [{scale: squeezValue}]}]}>
                  <Animated.Text style={[styles.cardText, { opacity: animatedAlpha }]}>
                    {answer}
                  </Animated.Text>
                </Animated.View>
              : <Animated.View style={[styles.card, { transform : [{scale: squeezValue}]}]}>
                  <Animated.Text style={[styles.cardText, { opacity: animatedAlpha }]}>
                    {question}
                  </Animated.Text>
                </Animated.View>
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
    padding: 15,
    justifyContent: 'space-between',
  },
  scoreTextContainer: {
    flex: 1
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
