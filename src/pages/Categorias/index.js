import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import Produto from '../../componentes/Pdt-feed';

import api from '../../servicos/api';

export default function Categorias() {

  const [produtos, setProdutos] = useState([])

  const {params} = useRoute()
  const navigation = useNavigation()

  useEffect(() => {

    navigation.setOptions({
      title: params?.nome

    })

    ProdutosPorCategoria()

  }, [])

  async function ProdutosPorCategoria() {
    await api.get(`/porcategoria?categoriaID=${params?.id}`)
    .then(({data}) => {
      setProdutos(data);

    })
  }

  return (

    <FlatList

      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

    />
  );
}