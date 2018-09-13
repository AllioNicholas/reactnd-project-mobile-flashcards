import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'
import { submitDeck } from '../utils/deckAPI'
import { addDeck } from '../actions'

function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn }>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const key = Date.now()
    const { title } = this.state

     this.props.dispatch(addDeck({
       [key]: {
         title,
         questions: []
       }
     }))

     this.setState(() => ({
       title: ''
     }))

     this.props.navigation.goBack()

     submitDeck({ key, title })
  }

  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <Text>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(title) => this.setState({title})}
          value={title}
          />
        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  iosSubmitBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
  },
  inputText: {
    padding: 30,
    backgroundColor: 'white'
  }
})

export default connect()(NewDeck)
