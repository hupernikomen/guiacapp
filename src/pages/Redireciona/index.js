import { useEffect, useContext, useState } from 'react';
import { View,Text } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';

export default function Redireciona() {

  const route = useRoute()
  const navigation = useNavigation()
  const {credenciais} = useContext(LojaContext)

  useEffect(() => {

    setTimeout(() => {
      if (credenciais?.conta?.loja) {
        navigation.reset({ index: 0, routes: [{ name: 'HomeControle' }] })
        
      } else if(credenciais?.conta?.profissional) {
        navigation.reset({ index: 0, routes: [{ name: 'Profissional' }] })
      }
    }, 3000);
  }, [])



  return (
    <View>

      <Text>Estamos buscando seus dados</Text>
    </View>
  );
}