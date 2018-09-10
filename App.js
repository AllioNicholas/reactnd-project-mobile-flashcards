import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'

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

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },

})

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
}
