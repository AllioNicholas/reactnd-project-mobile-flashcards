import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function ActionButton ({ onPress, title, buttonStyle, textStyle, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[styles.submitBtn, buttonStyle]}>
      <Text style={[styles.submitBtnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'navy',
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white'
  }
})
