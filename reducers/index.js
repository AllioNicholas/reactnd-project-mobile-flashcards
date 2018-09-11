import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD_TO_DECK:
      // const { card } = action
      // let questions = {}
      //
      // if (card.questions !== null) {
      //   questions = {
      //
      //   }
      // }
      //
      // return {
      //   ...state,
      //   [action.deck.id] : {
      //     ...action.deck,
      //     questions: state[deck.id].questions.concat([action.card])
      //   }
      // }
    default:
      return state
  }
}
