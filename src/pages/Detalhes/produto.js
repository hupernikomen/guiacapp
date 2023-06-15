import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Pinchable from 'react-native-pinchable';

import api from '../../servicos/api';

import { ProdutoContext } from '../../contexts/produtoContext';

import estilo from './estilo'
import Avatar from '../../componentes/Avatar';
import Load from '../../componentes/Load';
import Animated, { FadeInRight } from 'react-native-reanimated';


export default function Detalhes() {

  const [load, setLoad] = useState(false)

  const { arrTamanhos } = useContext(ProdutoContext)

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
    await api.get(`/detalhe/produto?produtoID=${route.params.id}`)
      .then((response) => {

        setProduto(response.data);
        setLoad(false)
      })

  }

  function SizesFormatted(tams) {
    const sizesDefault = arrTamanhos;
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

    <ScrollView
      showsVerticalScrollIndicator={false}
      style={estilo.pagina}>
      <FlatList
        initialNumToRender={5}
        style={{ width: WIDTH, aspectRatio: 7 / 9, backgroundColor: '#f1f1f1' }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={produto.imagens}
        horizontal
        renderItem={({ item }) => <RenderItem data={item} />}
      />

      <View
        style={estilo.container_loja}
        onPress={() => navigation.navigate("Loja", produto.loja?.id)}>
        <Avatar DATA={produto.loja} WIDTH={40} SIZE={12} />

        <Animated.View
          entering={FadeInRight.duration(500)}
          style={{ marginLeft: 15 }}>
          <Text
            style={estilo.nome_loja}>{produto.loja?.nome}</Text>

          <Text style={estilo.info_botao_loja}>Acessar página da loja</Text>
        </Animated.View>
      </View>

      <View style={{
        paddingHorizontal: 20,
      }}>



        {produto.campanha && <View style={{ position: 'relative', height: 20, marginTop: 15 }}>
          <Text style={{ borderRadius: 4, backgroundColor: '#000000', color: '#fff', paddingHorizontal: 10, paddingVertical: 2, fontSize: 10, position: 'absolute' }}>{produto?.campanha?.nome}</Text>
        </View>}

        <Text style={{ fontFamily: 'Roboto-Light', color: '#000', marginTop: 15 }}>{produto.categoria?.nome}</Text>
        <Animated.Text
          entering={FadeInRight.duration(500).delay(200)}
          style={{
            fontSize: 22,
            fontFamily: 'Roboto-Bold',
            textTransform: 'uppercase',
            color: '#000'
          }}>{produto.nome?.trim()}</Animated.Text>

        <Animated.Text
          entering={FadeInRight.duration(500).delay(350)}
          style={{
            fontSize: 22,
            marginVertical: 20,
            fontFamily: 'Roboto-Bold',
            color: '#000'
          }}>
          {!!produto.oferta ?
            <View>
              <TxtPrecoAntigo>{formateValor(produto.preco)}</TxtPrecoAntigo>

              <Text style={estilo.preco}>{formateValor(produto.oferta)} <Text style={estilo.avista}>à vista</Text></Text>
            </View>
            :

            <Text style={estilo.preco}>{formateValor(produto.preco)} <Text style={estilo.avista}>à vista</Text></Text>
          }

        </Animated.Text>


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

        <View style={{ marginVertical: 15 }}>

          <Text style={{ fontFamily: 'Roboto-Medium', color: '#000' }}>Descrição do Produto</Text>
          <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>
            {produto.descricao}
          </Text>
        </View>


      </View>


    </ScrollView>

  );
}
