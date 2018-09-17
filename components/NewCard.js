import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TextInput, Text, StyleSheet } from 'react-native'
import { submitCardToDeck } from '../utils/deckAPI'
import { addCardToDeck } from '../actions'
import ActionButton from './ActionButton'


class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { question, answer } = this.state
    const { deckId } = this.props

    this.props.dispatch(addCardToDeck({
      card: {
        question,
        answer
      },
      deckId
    }))

    this.setState(() => ({
      question: '',
      answer: ''
    }))

    this.props.navigation.goBack()

    submitCardToDeck({
      card: {
        question,
        answer
      },
      deckId
    })

  }

  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.headerText}>
          Question:
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="Question like 'How do you say `Pizza`?'"
          returnKeyType='done'
          onChangeText={(question) => this.setState({question})}
          value={question} />
        <Text style={styles.headerText}>
          Answer:
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="Answer like `Pizza`"
          returnKeyType='done'
          onChangeText={(answer) => this.setState({answer})}
          value={answer} />
        <ActionButton
          onPress={this.submit}
          disabled={question.length == 0 || answer.length === 0}
          title='Create Card'
          buttonStyle={{ backgroundColor: 'navy' }}
          textStyle={{ color: 'white'}} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  headerText: {
    color: 'navy',
    fontSize: 20,
    marginBottom: 5
  },
  inputText: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'navy',
    borderWidth: 0.5,
    marginBottom: 20
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId
  }
}

export default connect(mapStateToProps)(NewCard)
