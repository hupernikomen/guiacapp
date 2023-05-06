import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@react-navigation/native';

export default function Delivery() {

  const { colors } = useTheme()
  return (
    <View style={[styles.card]}>
      <Material name='truck-fast' size={20} color={colors.vartema} />
     
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
    right:0,
    zIndex: 9,
  }
})