import React, { useEffect, useState, useRef } from 'react';
import { FlatList, RefreshControl, Animated } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoFeed';
import SldCat from '../../componentes/SldCat';

import api from '../../servicos/api';

import Tabbar from '../../componentes/Tabbar';

import { useNavigation } from '@react-navigation/native'


export default function Home() {

  const navigation = useNavigation()
  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    onRefresh()

  }, [])


  const onRefresh = () => {
    CarregaProdutos()
  };


  async function CarregaProdutos() {

    setCarregando(true)
    try {
      const response = await api.get('/produtos')
      shuffleArray(response.data)
      setCarregando(false)

    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
      }

    }

  }



  function shuffleArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setProdutos(arr);
  }


  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginHorizontal: 5, marginVertical: 5 }}
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
