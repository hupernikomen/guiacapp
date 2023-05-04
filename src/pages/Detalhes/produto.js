import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import { useNavigation, useRoute, useTheme, useFocusEffect } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";

import Pinchable from 'react-native-pinchable';

import Share from "react-native-share";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { ContainerLoja, NomeLoja, ProdutoNome, ContainerPreco, TxtPreco, TxtPrecoAntigo, BtnIconeLoja } from './styles'
import { TextoPadrao } from '../../styles';


export default function Detalhes() {

  console.log('Pagina Detahes')

  const navigation = useNavigation()
  const route = useRoute()

  const { colors } = useTheme()

  const { width: WIDTH } = Dimensions.get('window')

  const [{ nome, imagens, descricao, preco, oferta, categoria, tamanho, loja }, setProduto] = useState([])

  useFocusEffect(
    useCallback(() => {

      let stt = true

      setProduto(route.params?.item)

      return () => {
        stt = false
      }

    }, [])
  )



  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <BtnIconeLoja
            lado={'flex-end'}
            activeOpacity={.8}
            onPress={async () => {
              await share();
            }}
          >
            <Material name='share-variant-outline' size={24} color='#fff' />
          </BtnIconeLoja>

          <BtnIconeLoja
            lado={'flex-end'}
            activeOpacity={.8}
            onPress={() => navigation.navigate("Loja", loja)}>

            <Material name='storefront-outline' size={24} color='#fff' />
          </BtnIconeLoja>
        </>
      )
    })
  }, [imagens])

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }





  function RenderItem({ data }) {
    return (
      <Pinchable minimumZoomScale={1} maximumZoomScale={2.8}>
        <Image
          source={{ uri: data.location }}
          style={{
            width: WIDTH - 45,
            aspectRatio: 3 / 4,
            flex: 1,
            borderRadius: 10,
          }}
        />

      </Pinchable>

    )
  }


  const title = ""
  const url = loja && imagens[0]?.location;
  const message = nome + " | " + String('*R$' + parseFloat(preco).toFixed(2) + '*');

  const options = {
    title,
    url,
    message,
  };

  const share = async (customOptions = options) => {

    try {
      await Share.open(customOptions)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>


      <FlatList

        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 5, backgroundColor: '#f1f1f1', marginBottom: 10 }}
        snapToInterval={WIDTH - 40}
        ItemSeparatorComponent={<View style={{ marginRight: 5 }} />}
        data={imagens}
        pagingEnabled
        horizontal
        renderItem={({ item }) => <RenderItem data={item} />}
      />


      <View style={{
        paddingHorizontal: 20,
      }}>

        <ContainerLoja>
          <NomeLoja>{loja?.nome}</NomeLoja>

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
                {item}
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
