import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native'
import { submitDeck } from '../utils/deckAPI'
import { addDeck } from '../actions'

function SubmitButton ({ onPress, ...props }) {
  return (
    <TouchableOpacity
      {...props}
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
         id: key,
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
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.titleText}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(title) => this.setState({title})}
          value={title} />
        <SubmitButton onPress={this.submit} disabled={title.length === 0} />
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
  iosSubmitBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'navy',
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
    backgroundColor: 'navy'
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white'
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
