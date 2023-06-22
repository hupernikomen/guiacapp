import {useEffect} from 'react';
import { View, Text } from 'react-native';

import { useRoute,useNavigation } from '@react-navigation/native';

export default function Profissionais() {

  const route = useRoute()
  const navigation =useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.nome
    })
  },[]) 

  return (
    <View>
      <Text>Buscar Profissionais aqui por esse servicoID: {route.params?.id}</Text>
      <Text>{route.params?.icone}</Text>
    </View>
  );
}