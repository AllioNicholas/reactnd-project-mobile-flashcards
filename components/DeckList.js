import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { receiveDecks } from '../actions'
import { getAllDecks } from '../utils/deckAPI'
import DeckListItem from './DeckListItem'

class DeckList extends Component {
  componentDidMount() {
      const { dispatch } = this.props

      getAllDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  renderItem = ({ item }) => {
    return <DeckListItem onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckId: item.id, title: item.title }
            )}
            {...item} />
  }

  render() {
    const { decks } = this.props

    return (
      <FlatList
      data={Object.values(decks).sort((a, b) => a.id > b.id)}
      renderItem={this.renderItem}
      keyExtractor={(item, index) => index.toString()} />
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
