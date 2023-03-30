import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';

import InputSearch from '../../componentes/InputSearch';
import Produto from '../../componentes/Produto/ProdutoFeed';
import SldCat from '../../componentes/SldCat';


import api from '../../servicos/api';

import Tabbar from '../../componentes/Tabbar';

import Load from '../../componentes/Load';


export default function Home() {

  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    CarregaProdutos()

  }, [])


  const onRefresh = () => {
    setCarregando(true);
    CarregaProdutos()
  };


  async function CarregaProdutos() {

    setCarregando(true)
    try {
      const response = await api.get('/produtos')
      shuffleArray(response.data)
      setCarregando(false)

    } catch (error) {
      console.log(error);

    }

  }

  function shuffleArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setProdutos(arr);
  }

  if (carregando) {
    return (
      <Load />
    )
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ margin: 4 }}
        ListHeaderComponent={
          <SldCat />
        }
        data={produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={onRefresh}
          />
        }

      />
      <Tabbar />
    </>
  )
}
