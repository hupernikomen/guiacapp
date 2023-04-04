import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@react-navigation/native';

export default function Delivery({ left }) {

  const { colors } = useTheme()
  return (
    <View style={[styles.card, { left }]}>
      <Material name='truck' size={16} color={'#fff'} />
      <Material style={{
        position: 'absolute',
        zIndex: -1,
      }} name='card' size={30} color={colors.vartema} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    padding: 4,
    marginHorizontal: 4,
    position: "absolute",
    top: -6,
    zIndex: 9,
  }
})