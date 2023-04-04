import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import CardLoja from '../../componentes/CardLoja';

import api from '../../servicos/api';

import { useNavigation } from '@react-navigation/native';


export default function Lojas() {

  const navigation = useNavigation()

  const [listaLojas, setListaLojas] = useState([])
  const [lojas, setLojas] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')

  useEffect(() => {

    const s = listaLojas.length > 1 ? "s" : ""

    navigation.setOptions({
      title: ` Loja${s} Cadastrada${s}`,
      headerSearchBarOptions: {
        onChangeText: (event) => {
          setBusca(event.nativeEvent.text)

        },
        headerIconColor: '#fff',
        textColor: '#fff',
      },
    })

    CarregaLojas()
  }, [navigation])


  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  useEffect(() => {
    const listafiltrada = listaLojas.filter((item) => {

      const lojas = item.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const pesquisa = busca.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (lojas.indexOf(pesquisa) > -1) {
        return lojas.indexOf(pesquisa) > -1

      } else {
        return
      }

    });


    setLojas(listafiltrada)
    setCarregando(false)
  }, [busca])

  async function CarregaLojas() {
    const response = await api.get('/lojas')
    setListaLojas(response.data)

  }


  return (
    <FlatList
    contentContainerStyle={{marginVertical:6}}
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 5 }}
      numColumns={2}
      data={busca ? lojas : listaLojas}
      renderItem={({ item }) => <CardLoja loja={item} />}
    // refreshControl={
    //   <RefreshControl
    //     refreshing={carregando}
    //     onRefresh={onRefresh}
    //   />
    // }
    />

  );
}
