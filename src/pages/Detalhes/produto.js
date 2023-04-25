import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';

import { useNavigation, useRoute, useIsFocused, useTheme } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { ContainerLoja, NomeLoja, ProdutoNome, ContainerPreco, TxtPreco, TxtPrecoAntigo } from './styles'
import { BtnIcone, TextoPadrao } from '../../styles'

export default function Detalhes() {

  const navigation = useNavigation()
  const route = useRoute()
  const focus = useIsFocused()

  const [estadoDescricao, setestadoDescricao] = useState(false)

  const { colors } = useTheme()

  const { width: WIDTH } = Dimensions.get('window')

  const [{ nome, imagens, descricao, preco, oferta, categoria, tamanho, loja }, setProduto] = useState([])

  useEffect(() => {

    setProduto(route.params?.item)

    navigation.setOptions({
      headerRight: () => (

        <TouchableOpacity
          activeOpacity={.8}
          onPress={() => { }}
        >
          <Material name='share-variant-outline' size={24} color='#fff' />
        </TouchableOpacity>
      )
    })

  }, [focus])

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }


  function RenderItem({ data }) {
    return (
      <View
        style={{
          width: WIDTH,
          aspectRatio: 3 / 4,
          backgroundColor: '#ddd'
        }}
      >
        <Image
          source={{ uri: data.location }}
          style={{
            flex: 1,
            // resizeMode: 'contain',
          }}
        />

      </View>
    )
  }

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={imagens}
        pagingEnabled
        horizontal
        renderItem={({ item }) => <RenderItem data={item} />}
      />


      <View style={{
            paddingHorizontal: 20,
            paddingVertical: 10
      }}>

        <ContainerLoja>
          <NomeLoja>{loja?.nome}</NomeLoja>

          <BtnIcone
            lado={'center'}
            activeOpacity={.8}
            onPress={() => navigation.navigate("Loja", loja)}>

            <Material name='storefront-outline' size={24} color='#000' />
          </BtnIcone>

        </ContainerLoja>

        <TextoPadrao>Categoria: {categoria?.nome}</TextoPadrao>
        <ProdutoNome>{nome?.trim()}</ProdutoNome>


        <ContainerPreco>
          {!!oferta ?
            <View>
              <TxtPrecoAntigo>{Preco(parseFloat(preco).toFixed(2))}</TxtPrecoAntigo>

              <TxtPreco>{Preco(parseFloat(oferta).toFixed(2))}</TxtPreco>
            </View>
            :

            <TxtPreco>{Preco(parseFloat(preco).toFixed(2))}</TxtPreco>
          }
          <TextoPadrao>à vista</TextoPadrao>
        </ContainerPreco>


        <TextoPadrao>Tamanhos:</TextoPadrao>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>


          {tamanho?.map((item, index) => {
            return (

              <Text
                key={index}
                style={{
                  color: '#000',
                  padding: 5,
                  color: '#fff',
                  borderRadius: 6,
                  marginRight: 5,
                  backgroundColor: colors.vartema
                }}>
                {item ? item : "Unico"}
              </Text>
            )
          })}
        </View>

        <TextoPadrao>
          {descricao}
        </TextoPadrao>


      </View>


    </ScrollView>
  );
}
