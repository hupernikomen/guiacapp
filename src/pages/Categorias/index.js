import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import api from '../../servicos/api';

import { useRoute, useNavigation } from '@react-navigation/native';
import Produto from '../../componentes/Produto/ProdutoFeed';

export default function Categorias() {

  const [produtos, setProdutos] = useState([])

  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.nome
    })

    async function PegaCategorias() {
      const response = await api.get(`/porcategoria?categoriaID=${route.params?.id}`)
      setProdutos(response.data);
    }

    PegaCategorias()
  }, [])


  return (

    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 8 }}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

    />
  );
}