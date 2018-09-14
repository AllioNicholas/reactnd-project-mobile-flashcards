import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'

const RouteConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}

const Tabs = Platform.OS === 'ios'
? createBottomTabNavigator(RouteConfigs)
: createMaterialTopTabNavigator(RouteConfigs)

const DeckDetailNavigator = createStackNavigator(
  {
    DeckDetail: {
      screen: DeckDetail
    },
    NewCard: {
      screen: NewCard
    },
    StartQuiz: {
      screen: Quiz
    }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetailNavigator: {
    screen: DeckDetailNavigator
  }
})

export default class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
