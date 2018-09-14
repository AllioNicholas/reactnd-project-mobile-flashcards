import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function SubmitButton ({ onPress, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={styles.submitBtn}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
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
