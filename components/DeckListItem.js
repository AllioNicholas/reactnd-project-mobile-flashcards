import React from 'react'
import { View, Text } from 'react-native'

export default function DeckListItem ({ title, questions }) {
  return (
    <View>
      <Text style={{color: 'red', fontSize: 25}}>
        {title}
      </Text>
      <Text>
        {questions.length} questions
      </Text>
    </View>
  )
}
