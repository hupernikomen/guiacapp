import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import ProdutoFeed from '../../componentes/Produto/ProdutoFeed';
import api from '../../servicos/api';
export default function Search() {
  const route =useRoute()

  console.log(route.params);

  const navigation = useNavigation()

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState(route.params)

  const [titulo, setTitulo] = useState("")

  useEffect(() => {
    navigation.setOptions({
      title: titulo,
      headerTitleStyle: {
        fontSize: 20
      }
    })

    BuscaProdutos()

  }, [titulo])


  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  async function BuscaProdutos() {

    if (busca == "") return

    setCarregando(true)

    await api.get('/produtos')
      .then((response) => {

        const listafiltrada = response.data.filter((item) => {

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
        setTitulo(`Encontramos ${listafiltrada.length} produto${listafiltrada.length > 1 ? "s" : ""}...`)
        setCarregando(false)
      })
  }

  function Vazio() {
    const { heigth } = Dimensions.get('window')
    return (
      <View
        style={{
          height: heigth,
          alignItems: "center",
          justifyContent: "center",
          margin: 20
        }}
      >

        <Text style={{ fontSize: 18, textAlign: "center", color: "#222" }}>Infelizmente não encontramos nenhum item com esse nome...</Text>
      </View>
    )
  }

  return (
    <>

      <TextInput onChangeText={setBusca} value={busca} placeholder='Oque vocêprocura?' />
      <TouchableOpacity
        onPress={BuscaProdutos}>
        <Text>Pesquisar</Text>
      </TouchableOpacity>
      
        <FlatList
        ListEmptyComponent={Vazio}
        showsVerticalScrollIndicator={false}
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProdutoFeed item={item} />}
        numColumns={2}
        />
    </>
  );
}