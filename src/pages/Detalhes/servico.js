import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, FlatList, ScrollView } from 'react-native';

import {
  useRoute,
  useTheme,
  useNavigation
} from '@react-navigation/native'


import estilo from './estilo';

export default function DetalheServico() {
  const [servico, setServico] = useState([])
  const route = useRoute()


  useEffect(() => {
    setServico(route.params?.data)
console.log(route.params.data);
  }, [])

  return (
    <ScrollView style={estilo.pagina}>


    </ScrollView>
  );
}

