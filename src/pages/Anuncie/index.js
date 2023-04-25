import React from 'react';
import { View } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Anuncie() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const valores = [{
    lojas: {
      preco: '14,90',
      oferta: '12,90'
    },
    servicos: {
      preco: '4,90',
      oferta: '4,10'
    }
  }]

  return (
    <View></View>
  );
}
