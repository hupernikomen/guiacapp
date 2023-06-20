import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Pressable, FlatList, ToastAndroid, Image } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import api from '../../servicos/api';


export default function Vendedores() {

  const { credenciais } = useContext(LojaContext)
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [idSelecionado, setIdSelecionado] = useState(null)

  const [vendedores, setVendedores] = useState([])

  useFocusEffect(
    useCallback(() => {
      BuscarVendedores()

      return () => {
        setIdSelecionado(null)
      }
    }, [])
  )

  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function BuscarVendedores() {
    await api.get(`/vendedores?lojaID=${credenciais.id}`)
      .then((response) => {
        setVendedores(response.data);
      })
  }

  async function Excluir(id) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.delete(`/vendedor?vendedorID=${id}`, { headers })
      .then(() => {
        Toast("Vendedor Excluido")
        BuscarVendedores()
      })

  }


  // Pega o horario do vendedor e converte em um hora calculavel
  const converteHorario = (ponto) => {
    return new Date(ponto).toLocaleTimeString().substring(0, 5)
  }


  function RenderItem({ data }) {
    const { e: entrada, a: almoco, r: retorno, s: saida } = JSON.parse(data.horario)

    return (
      <Pressable
        onLongPress={() => setIdSelecionado(data.id)}>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 6,
            backgroundColor: '#fff'
          }}>
          <View style={{ flexDirection: "row" }}>

            <Image
              source={{ uri: data.avatar?.location }}
              style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: 55 / 2,
                marginRight: 15
              }} />

            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Roboto-Bold',
                  color: '#000',
                  fontSize: 18
                }}>
                {data.nome}
              </Text>


              <Text style={{ fontFamily: "Roboto-Light", color: '#000', fontSize: 13 }}>{converteHorario(entrada)} - {converteHorario(almoco)} - {converteHorario(retorno)} - {converteHorario(saida)} </Text>
            </View>
          </View>


          {idSelecionado === data.id &&
            <Animated.View
              entering={FadeInRight}
            >

              <Pressable
                style={{ backgroundColor: colors.tema, borderRadius: 6, width: 40, aspectRatio: 1, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => Excluir(data.id)}>
                <Material name='delete' size={25} color='#fff' />
              </Pressable>
            </Animated.View>
          }

        </View>
      </Pressable>
    )
  }


  return (
    <>
      <FlatList
        data={vendedores}
        renderItem={({ item }) => <RenderItem data={item} />}
      />

      <View
        style={{
          width: 55,
          aspectRatio: 1,
          borderRadius: 55 / 2,
          position: 'absolute',
          zIndex: 9999,
          right: 15,
          bottom: 25,
          backgroundColor: colors.tema,
          elevation: 5
        }}>

        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          background={colors.tema}
          onPress={() => navigation.navigate("CadastrarVendedor")}>
          <Material name='plus-thick' size={26} color='#fff' />
        </Pressable >
      </View >

    </>
  )
}
