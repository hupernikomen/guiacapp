import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text, TextInput, TouchableOpacity } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native';

import ProdutoFeed from '../../componentes/Produto/ProdutoFeed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
        textColor:'#fff',
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

      } else {
        return descricao.indexOf(pesquisa) > -1

      }

    });


    setProdutos(listafiltrada)
    setCarregando(false)
  }, [busca])

  async function CarregaProdutos() {
    const response = await api.get('/produtos')
    setListaProdutos(response.data)

  }


  // async function BuscaProdutos() {

  //   setCarregando(true)

  //   try {

  //     const listafiltrada = listaProdutos.filter((item) => {

  //       const produtos = item.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  //       const descricao = item.descricao.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  //       const pesquisa = busca.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

  //       if (produtos.indexOf(pesquisa) > -1) {
  //         return produtos.indexOf(pesquisa) > -1

  //       } else {
  //         return descricao.indexOf(pesquisa) > -1

  //       }

  //     });

  //     setProdutos(listafiltrada)
  //     setTitulo(`Encontramos ${listafiltrada.length} produto${listafiltrada.length > 1 ? "s" : ""}...`)
  //     setCarregando(false)

  //   } catch (error) {

  //   }


  // }



  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ margin: 4 }}
      data={produtos}
      renderItem={({ item }) => <ProdutoFeed item={item} />}
      numColumns={2}
    />
  );
}
