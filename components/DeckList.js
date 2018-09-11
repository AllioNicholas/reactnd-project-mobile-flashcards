import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { receiveDecks } from '../actions'
import { getAllDecks } from '../utils/deckAPI'

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
      const { dispatch } = this.props

      getAllDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {
    const decks = this.props
    return (
      <View>
        <Text>
          {JSON.stringify(decks)}
        </Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
