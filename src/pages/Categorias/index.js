import React, { useEffect, useState } from 'react';
import { View, Text,FlatList  } from 'react-native';

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

    PegaCategorias()
  }, [])
  
  
  async function PegaCategorias() {
    await api.get(`/porcategoria?categoriaID=${route.params?.id}`)
    .then((response) => {
        setProdutos(response.data);
      })
  }

  return (
    <View>

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ margin: 4 }}
        data={produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}

      />
    </View>
  );
}