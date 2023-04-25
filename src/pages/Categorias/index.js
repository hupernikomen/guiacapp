import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import api from '../../servicos/api';

import { useRoute, useNavigation } from '@react-navigation/native';
import Produto from '../../componentes/Produtos/pdt-feed';

export default function Categorias() {

  const [produtos, setProdutos] = useState([])

  const {params} = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: params?.nome

    })

    async function PegaCategorias() {
      const response = await api.get(`/porcategoria?categoriaID=${params?.id}`)
      setProdutos(response.data);
    }

    PegaCategorias()
  }, [])


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