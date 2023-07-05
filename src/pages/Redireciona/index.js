import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { LojaContext } from '../../contexts/lojaContext';

export default function Redireciona() {
  const navigation = useNavigation()
  const { credenciais } = useContext(LojaContext)

  useEffect(() => {

    if (credenciais?.conta?.loja) {
      navigation.reset({ index: 0, routes: [{ name: 'HomeControle' }] })

    } else if (credenciais?.conta?.profissional) {
      navigation.reset({ index: 0, routes: [{ name: 'Profissional' }] })

    } else if (credenciais?.conta?.posto) {
      navigation.reset({ index: 0, routes: [{ name: 'Posto' }] })
    }
  }, [])

  return (
    <View />
  );
}