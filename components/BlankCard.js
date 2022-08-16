import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

function BlankCard() {
  return (
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 4.6,
    height: windowWidth / 4.6,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#CCC0B3'
  }
})

export default BlankCard