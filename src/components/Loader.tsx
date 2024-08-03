import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { fontStyles } from '../style/FontsStyle';
import Colors from '../configs/Colors';

const Loader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[fontStyles.big_title_text, { color: Colors.darkYellow }]}>Loading...</Text>
      <ActivityIndicator size={'small'} animating={true} color={MD2Colors.red800} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})