import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Anuncie() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  return (
    <View
      style={styles.tela}>
        <Text>Anuncie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },

})