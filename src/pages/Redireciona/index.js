import { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';

import { useRoute, useNavigation, useTheme } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';

import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Redireciona() {

  const route = useRoute()
  const navigation = useNavigation()
  const { credenciais } = useContext(LojaContext)

  useEffect(() => {

    setTimeout(() => {
      if (credenciais?.conta?.loja) {
        navigation.reset({ index: 0, routes: [{ name: 'HomeControle' }] })

      } else if (credenciais?.conta?.profissional) {
        navigation.reset({ index: 0, routes: [{ name: 'Profissional' }] })
      }

    }, 1500);
  }, [])



  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    }}>

      <Animated.Text
        entering={FadeInDown.delay(200).duration(1000)}


        style={{
          width: '80%',
          fontFamily: 'Roboto-Bold',
          color: '#000',
          fontSize: 28
        }}>Estamos buscando seus dados...</Animated.Text>
    </View>
  );
}