import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import api from '../../servicos/api';

import { useRoute, useNavigation } from '@react-navigation/native';
import Produto from '../../componentes/Produto';

export default function Categorias() {

  const [produtos, setProdutos] = useState([])

  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.nome

    })
    console.log(route.params)

    async function PegaCategorias() {
      const response = await api.get(`/porcategoria?categoriaID=${route.params?.id}`)
      setProdutos(response.data);
    }

    PegaCategorias()
  }, [])


  return (

    <FlatList
    contentContainerStyle={{marginVertical:6}}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 8 }}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

    />
  );
}