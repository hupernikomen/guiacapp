import React, { useEffect, useContext, useState, } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native';
import { BtnMais } from './styles'
import { BtnIcone, Tela } from '../../styles'

import { useNavigation, useTheme } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';

import ProdutoControle from '../../componentes/Produtos/pdt-feed-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../servicos/api';

export default function HomeControle() {

  const { credenciais } = useContext(LojaContext)
  const navigation = useNavigation()

  const [loja, setLoja] = useState([])

  const { colors } = useTheme()

  const [carregando, setCarregando] = useState(false)



  useEffect(() => {
    BuscaLoja()

  }, [])




  const ToastErro = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function BuscaLoja() {
    setCarregando(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/me?lojaID=${credenciais.id}`, { headers })
      .then((response) => {

        setLoja(response.data)
        setCarregando(false)


      })
      .catch((error) => {
        ToastErro(error.status)
        setCarregando(false)
      })

  }



  if (carregando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={30} color={colors.tema} />
      </View>
    )
  }


  function Header() {
    return (
      <View style={{
        backgroundColor: colors.tema,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        height: 57,
        elevation: 5,
        zIndex: 999
      }}>

        <BtnIcone
          lado={'center'}
          onPress={() => navigation.openDrawer()}>
          <Material name='menu' size={24} color={'#fff'} />
        </BtnIcone>


        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: 15,
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            color: '#fff',
          }}>{loja.nome}</Text>


      </View>
    )
  }


  function CarrosselPaginas() {

    const paginas = [
      {
        nome: 'Dados',
        link: 'CadastrarDados',
      },
      {
        nome: 'Vendedores',
        link: 'VendedoresControle',
      },
      {
        nome: 'Mapa',
        link: 'Mapa',
      },
    ]

    return (
      <ScrollView
        horizontal
        style={{
          height: 50,
          width: '100%',
          backgroundColor: colors.tema,
          paddingHorizontal: 10,
        }}
      >

        {paginas.map((item, index) => (
          <TouchableOpacity
          key={index}
            style={{
              justifyContent: 'center',
              alignItems: "center",
              paddingHorizontal: 15
            }}
            onPress={() => navigation.navigate(item.link)}
          >
            <Text style={{
              textTransform: 'uppercase',
              fontFamily: 'Roboto-Medium',
              fontSize: 13,
              color: '#fff',
            }}>{item.nome}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    )
  }


  return (
    <>

      <Header />
      <CarrosselPaginas />

      <FlatList
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Você não tem nenhum produto postado.</Text>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

              <Text style={{ fontFamily: 'Roboto-Light', marginRight: 5, color: '#000' }}>Para postar clique no botão</Text>
              <Material name='plus-thick' size={20} color='#000' />

            </View>
          </View>
        }
        data={loja?.produtos}
        contentContainerStyle={{ marginTop: 4 }}
        columnWrapperStyle={{ margin: 4 }}
        renderItem={({ item }) => <ProdutoControle item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <BtnMais
        background={colors.tema}
        lado={'flex-end'}
        onPress={() => navigation.navigate("CadastrarProduto")}>
        <Material name='plus-thick' size={24} color='#fff' />
      </BtnMais>

    </>
  );
}



