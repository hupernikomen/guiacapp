import React from 'react';
import { View, Text } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@react-navigation/native';

export default function Delivery({ left }) {

  const { colors } = useTheme()
  return (
    <View style={{
      alignItems: 'center',
      justifyContent:'center',
      flexDirection: "row",
      padding: 4,
      marginHorizontal: 4,
      left: left,
      position: "absolute",
      top: -5,
      zIndex: 999,
    }}>
      <Material name='truck' size={18} color={'#222'} />
      <Material style={{
                position: 'absolute',
                zIndex:-1,
            }} name='card' size={35} color={colors.destaque} />
    </View>
  );
}