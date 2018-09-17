import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'

export default function ActionButton ({ onPress, title, buttonStyle, textStyle, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, buttonStyle]}>
      <Text style={[styles.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'navy',
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white'
  },
  AndroidBtn: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
