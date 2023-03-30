import React, { useEffect,useState } from 'react';
import { View,Text, FlatList } from 'react-native';

import CardLoja from '../../componentes/CardLoja';

import api from '../../servicos/api';

export default function Lojas() {

  const [lojas, setLojas] = useState([])

  useEffect(() => {
    BuscaLojas()
  }, [])

  async function BuscaLojas() {
    console.log("Rodou");
    try {
      const response = await api.get('/usuarios')
      setLojas(response.data);
    } catch (error) {

    }
  }
  return (
    <View>
     <FlatList
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 5 }}
      numColumns={2}
      data={lojas}
      renderItem={({item}) =><CardLoja loja={item}/>}
     />
    </View>
  );
}