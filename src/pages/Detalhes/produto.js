import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';

import Pinchable from 'react-native-pinchable';

import api from '../../servicos/api';

import { ContainerLoja, NomeLoja, ProdutoNome, ContainerPreco, TxtPreco, TxtPrecoAntigo, TextoAvista } from './styles'
import Avatar from '../../componentes/Avatar';
import Load from '../../componentes/Load';


export default function Detalhes() {

  const [load, setLoad] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()


  const { width: WIDTH } = Dimensions.get('window')

  const [produto, setProduto] = useState([])

  useEffect(() => {
    PegaItem()

  }, [route])

  if (load) {
    return <Load />
  }

  async function PegaItem() {
    setLoad(true)
    await api.get(`/detalhe?produtoID=${route.params.id}`)
      .then((response) => {

        setProduto(response.data);
        setLoad(false)
      })

  }

  function SizesFormatted(tams) {
    const sizesDefault = ['PP', 'P', 'M', 'G', 'GG'];
    const array = tams;

    array.sort((firstElement, secondElement) => {
      const positionInDefaultA = sizesDefault.indexOf(firstElement);
      const positionInDefaultB = sizesDefault.indexOf(secondElement);
      return positionInDefaultA - positionInDefaultB;
    });

    return array;
  };

  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }



  function RenderItem({ data }) {
    return (
      <Pinchable minimumZoomScale={.8} maximumZoomScale={2.9}>
        <Image
          source={{ uri: data.location }}
          style={{
            width: WIDTH,
            flex: 1,
            resizeMode: 'contain',
          }}
        />

      </Pinchable>

    )
  }

  return (

    <>
      {/* <Header /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>


        <FlatList
          style={{ width: WIDTH, aspectRatio: 3 / 4, backgroundColor: '#f1f1f1', marginBottom: 10 }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={produto.imagens}
          horizontal
          renderItem={({ item }) => <RenderItem data={item} />}
        />


        <View style={{
          paddingHorizontal: 20,
        }}>


          <ContainerLoja

            onPress={() => navigation.navigate("Loja", produto.loja?.id)}>
            <Avatar DATA={produto.loja} WIDTH={30} SIZE={12} />

            <View style={{ marginLeft: 10 }}>
              <NomeLoja>{produto.loja?.nome}</NomeLoja>
              <Text style={{ fontSize: 11, fontFamily: 'Roboto-Light', color: '#000' }}>Acessar pagina da loja</Text>
            </View>
          </ContainerLoja>

          {produto.campanha && <View style={{ position: 'relative', height: 20, marginTop: 15 }}>
            <Text style={{ borderRadius: 4, backgroundColor: '#000000', color: '#fff', paddingHorizontal: 10, paddingVertical: 2, fontSize: 10, position: 'absolute' }}>{produto?.campanha?.nome}</Text>
          </View>}

          <Text style={{ fontFamily: 'Roboto-Light', color: '#000', marginTop: 15 }}>Categoria: {produto.categoria?.nome}</Text>
          <ProdutoNome>{produto.nome?.trim()}</ProdutoNome>

          <ContainerPreco>
            {!!produto.oferta ?
              <View>
                <TxtPrecoAntigo>{formateValor(produto.preco)}</TxtPrecoAntigo>

                <TxtPreco>{formateValor(produto.oferta)} <TextoAvista>à vista</TextoAvista></TxtPreco>
              </View>
              :

              <TxtPreco>{formateValor(produto.preco)} <TextoAvista>à vista</TextoAvista></TxtPreco>
            }

          </ContainerPreco>


          {produto.tamanho?.length > 0 && <View style={{ flexDirection: 'row' }}>

            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Tamanhos Disponiveis:</Text>


            {SizesFormatted(produto.tamanho)?.map((item, index) => {
              return (

                <Text
                  key={index}
                  style={{
                    color: '#000',
                    borderRadius: 6,
                    marginLeft: 5,
                  }}>
                  {index != 0 && '- '}{item}
                </Text>
              )
            })}
          </View>}

          <View style={{ marginTop: 15 }}>

            <TextoAvista style={{ fontFamily: 'Roboto-Medium', color: '#000' }}>Descrição do Produto</TextoAvista>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>
              {produto.descricao}
            </Text>
          </View>


        </View>


      </ScrollView>
    </>

  );
}
