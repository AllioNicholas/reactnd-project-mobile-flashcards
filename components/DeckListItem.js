import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function DeckListItem ({ title, questions }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {title}
        </Text>
        <Text>
          {questions.length} questions
        </Text>
      </View>
      <View style={{ flex : 1, backgroundColor: 'silver', height: 1 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: 'white'
  },
  textContainer : {
    padding: 15
  },
  titleText: {
    color: 'navy',
    fontSize: 25
  }
})
