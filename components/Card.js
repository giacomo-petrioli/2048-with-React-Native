import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

function Card(props) {

  function getColor() {
    if (props.value == 2) return "#eee4da"
    else if (props.value == 4) return "#ede0c8"
    else if (props.value == 8) return "#f2b179"
    else if (props.value == 16) return "#F59563"
    else if (props.value == 32) return "#F67C60"
    else if (props.value == 64) return "#F65E3B"
    else if (props.value == 128) return "#EDCF73"
    else if (props.value == 256) return "#EDCC62"
    else if (props.value == 512) return "#EDC850"
    else if (props.value == 1024) return "#EDC53F"
    else if (props.value == 2048) return "#EDC22D"
    else if (props.value == 4096) return "#3E3933"
  }

  function getColorText() {
    if (props.value == 2) return '#776E65'
    else if (props.value == 4) return '#776E65'
    else return '#F9F6F2'
  }

  return (
    <View style={[styles.container, { backgroundColor: getColor() }]}>
      <Text style={[styles.text, { color: getColorText() }]}>{props.value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 4.6,
    height: windowWidth / 4.6,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default Card