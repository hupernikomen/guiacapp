import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { formatCurrency } from "react-native-format-currency";

import Pinchable from 'react-native-pinchable';

import api from '../../servicos/api';


import Share from "react-native-share";
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { ContainerLoja, NomeLoja, ProdutoNome, ContainerPreco, TxtPreco, TxtPrecoAntigo, BtnIconeLoja } from './styles'
import { TextoPadrao } from '../../styles';
import { ActivityIndicator } from 'react-native-paper';
import Avatar from '../../componentes/Avatar';


export default function Detalhes() {

  const [load, setLoad] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()

  const { colors } = useTheme()

  const { width: WIDTH } = Dimensions.get('window')

  const [produto, setProduto] = useState([])

  useEffect(() => {
    PegaItem()

  }, [route])

  async function PegaItem() {
    setLoad(true)
    await api.get(`/detalhe?produtoID=${route.params.id}`)
      .then((response) => {
        
        setProduto(response.data);
        setLoad(false)
      })

  }


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
            onPress={() => navigation.navigate("Loja", produto.loja?.id)}>

            <Material name='storefront-outline' size={24} color='#fff' />
          </BtnIconeLoja>
        </>
      )
    })
  }, [produto])

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }





  function RenderItem({ data }) {
    return (
      <Pinchable minimumZoomScale={1} maximumZoomScale={2.9}>
        <Image
          source={{ uri: data.location }}
          style={{
            width: WIDTH,
            aspectRatio: 3 / 4,
            flex: 1,
            resizeMode:'contain'
          }}
        />

      </Pinchable>

    )
  }


  const title = ""
  const url = produto.loja && produto.imagens[0]?.location;
  const message = produto.nome + " | " + String('*R$' + parseFloat(produto.preco).toFixed(2) + '*');

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

  if (load) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <ActivityIndicator color={colors.tema} />
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>


      <FlatList
        style={{ width: WIDTH, backgroundColor: '#f1f1f1', marginBottom: 10 }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={WIDTH + 5}
        ItemSeparatorComponent={<View style={{ width: 5 }} />}
        data={produto.imagens}
        horizontal
        renderItem={({ item }) => <RenderItem data={item} />}
      />


      <View style={{
        paddingHorizontal: 20,
      }}>

        <ContainerLoja>
          <Avatar DATA={produto.loja} WIDTH={30} SIZE={12}/>
          <NomeLoja>{produto.loja?.nome}</NomeLoja>

        </ContainerLoja>

        <ProdutoNome>{produto.nome?.trim()}</ProdutoNome>


        <ContainerPreco>
          {!!produto.oferta ?
            <View>
              <TxtPrecoAntigo>{Preco(parseFloat(produto.preco).toFixed(2))}</TxtPrecoAntigo>

              <TxtPreco>{Preco(parseFloat(produto.oferta).toFixed(2))}</TxtPreco>
            </View>
            :
            
            <TxtPreco>{Preco(parseFloat(produto.preco).toFixed(2))}</TxtPreco>
          }
          <TextoPadrao>à vista</TextoPadrao>
        </ContainerPreco>

          <TextoPadrao>Categoria: {produto.categoria?.nome}</TextoPadrao>

        <TextoPadrao>Tamanhos:</TextoPadrao>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>


          {produto.tamanho?.map((item, index) => {
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
          {produto.descricao}
        </TextoPadrao>


      </View>


    </ScrollView>
  );
}
