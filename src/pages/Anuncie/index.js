import React from 'react';
import { View, Text, TouchableOpacity,Linking } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';

import { TextoPadrao } from '../../styles'
import { Titulo, Subtitulo, ContainerSessao } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Anuncie() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const valores = [{
    lojas: {
      preco: '13,90',
      oferta: '9,90'
    },
    servicos: {
      preco: '5,90',
      oferta: '4,90'
    }
  }]

  return (
    <View style={{
      padding: 15
    }}>

      <ContainerSessao left={0}>

        <Titulo>Qual a forma de pagamento?</Titulo>
        <TextoPadrao>Assinatura mensal - cartão de crédito</TextoPadrao>
      </ContainerSessao>

      <ContainerSessao left={0}>

        <Titulo>Quem pode anunciar?</Titulo>
        <TextoPadrao>Lojistas que tenham ponto fixo ou prestem o serviço de entrega de seus produtos (Delivery). E prestadores de serviços profissionais de qualquer tipo.</TextoPadrao>
      </ContainerSessao>

      <ContainerSessao left={0}>

        <Titulo>Tipos de anúncios</Titulo>
        <TextoPadrao>Produtos, Serviço e Banners Promocionais</TextoPadrao>
      </ContainerSessao>

      <ContainerSessao left={10}>

        <Subtitulo>Lojista</Subtitulo>
        <TextoPadrao>Produtos com estoque em loja;</TextoPadrao>
        <TextoPadrao>Banners com duração minima de 1 semana;</TextoPadrao>
      </ContainerSessao>

      <ContainerSessao left={10}>

        <Subtitulo>Prestadores de Serviços</Subtitulo>
        <TextoPadrao>Serviços com detalhes de fotos, descrição, localização, contato (Whatsapp), etc;</TextoPadrao>
      </ContainerSessao>

      <ContainerSessao left={0}>

        <Subtitulo>Quero saber mais...</Subtitulo>
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${5586994773403}`)}
          >

          <TextoPadrao>Click aqui e fale Conosco</TextoPadrao>

        </TouchableOpacity>
      </ContainerSessao>



    </View>
  );
}
