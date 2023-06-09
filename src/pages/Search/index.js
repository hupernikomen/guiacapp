import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ProdutoFeed from '../../componentes/Produto-Feed';

import api from '../../servicos/api';

export default function Search() {

  const navigation = useNavigation()

  const [listaProdutos, setListaProdutos] = useState([])
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')


  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => {
          setBusca(event.nativeEvent.text)

        },
        headerIconColor: '#fff',
        textColor: '#fff',
        autoFocus: true,

      },
    })

    CarregaProdutos()
  }, [navigation])


  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  useEffect(() => {
    const listafiltrada = busca != "" && listaProdutos.filter((item) => {

      const produtos = item.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const descricao = item.descricao.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const pesquisa = busca.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (produtos.indexOf(pesquisa) > -1) {
        return produtos.indexOf(pesquisa) > -1

      } else if (descricao.indexOf(pesquisa) > -1) {
        return descricao.indexOf(pesquisa) > -1

      } else {
        return
      }

    });


    setProdutos(listafiltrada)
    setCarregando(false)
  }, [busca])

  async function CarregaProdutos() {
    const response = await api.get('/produtos')
    setListaProdutos(response.data)

  }

  function ListaVazia() {
    return (
      <View style={{
        marginTop: 15,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"

      }}>


        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          fontFamily: "Roboto-REgular",
          color: '#000'
        }}>Nós encontraremos para você...</Text>
      </View>
    )
  }


  return (
    <FlatList
      columnWrapperStyle={{ marginVertical: 2, gap: 4, paddingHorizontal: 4 }}
      contentContainerStyle={{ paddingBottom: 75 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<ListaVazia />}
      data={produtos}
      renderItem={({ item }) => <ProdutoFeed item={item} />}
      numColumns={2}
    />
  );
}
