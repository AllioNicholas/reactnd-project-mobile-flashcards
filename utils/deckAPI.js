import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'com.allio.nicholas.decks'

export function addEntryToDeck({ card, deck }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck.id]: {
        ...deck,
        card
      }
    }))
}

export function submitDeck({ key, title }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,
    JSON.stringify({
      [key]: {
        title,
        questions: []
      }
    }))
}

export function getAllDecks() {
  // AsyncStorage.clear()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}
