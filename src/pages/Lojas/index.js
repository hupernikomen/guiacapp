import React, { useEffect,useState } from 'react';
import { View,Text, FlatList,RefreshControl } from 'react-native';

import CardLoja from '../../componentes/CardLoja';

import api from '../../servicos/api';

export default function Lojas() {

  const [lojas, setLojas] = useState([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = () => {
    BuscaLojas()
  };

  async function BuscaLojas() {
    setCarregando(true)
    try {
      const response = await api.get('/lojas')
      shuffleArray(response.data)
      setCarregando(false)

    } catch (error) {

    }
  }

  function shuffleArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setLojas(arr);
  }


  return (
    <View>
     <FlatList
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 5 }}
      numColumns={2}
      data={lojas}
      renderItem={({item}) =><CardLoja loja={item}/>}
      refreshControl={
        <RefreshControl
          refreshing={carregando}
          onRefresh={onRefresh}
        />
      }
     />
    </View>
  );
}