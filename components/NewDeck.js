import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { submitDeck } from '../utils/deckAPI'
import { addDeck } from '../actions'
import ActionButton from './ActionButton'

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const key = Date.now()
    const { title } = this.state

     this.props.dispatch(addDeck({
       [key]: {
         id: key,
         title,
         questions: []
       }
     }))

     this.setState(() => ({
       title: ''
     }))

     this.props.navigation.navigate(
               'DeckDetail',
               { deckId: key, title: title }
             )

     submitDeck({ key, title })
  }

  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.titleText}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="Title like 'Italian course'"
          returnKeyType='done'
          onChangeText={(title) => this.setState({title})}
          value={title} />
        <ActionButton
          onPress={this.submit}
          disabled={title.length === 0}
          title='Create Deck'
          buttonStyle={{ backgroundColor: 'navy' }}
          textStyle={{ color: 'white'}} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start'
  },
  titleText: {
    color: 'navy',
    fontSize: 35,
    marginBottom: 30
  },
  inputText: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'navy',
    borderWidth: 0.5,
    marginBottom: 20
  }
})

export default connect()(NewDeck)
