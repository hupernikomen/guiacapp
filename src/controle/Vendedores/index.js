import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Pressable, FlatList, Alert, Image } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import Animated, { FadeInUp, SlideInDown } from 'react-native-reanimated';
import api from '../../servicos/api';


export default function Vendedores() {

  const { credenciais } = useContext(LojaContext)
  const { colors } = useTheme()
  const navigation = useNavigation()



  const [vendedores, setVendedores] = useState([])

  useFocusEffect(
    useCallback(() => {
      let ativo = true
      BuscarVendedores()


      return () => {
        ativo = false
      }
    }, [])
  )


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


    Alert.alert("Excluir", "Excluir este vendedor", [
      {
        text: "Sim",
        onPress: async () => {
          await api.delete(`/vendedor?vendedorID=${id}`, { headers })
            .then(() => {
              BuscarVendedores()
            }
            )
            .catch((error) => console.log(error.response))
        },
      },
      { text: "Não" },
    ])
  }




  function RenderItem({ data }) {
    return (
      <Pressable
        onPress={() => Excluir(data.id)}>
        <Animated.View
          entering={FadeInUp}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            padding: 10,
            marginVertical: 5,
            borderRadius: 6,
            backgroundColor: '#fff'
          }}>

          <Image
            source={{ uri: data.avatar?.location }}
            style={{
              width: 55,
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

            <Text style={{
              fontFamily: 'Roboto-Light',
              color: '#000',
              fontSize: 13
            }}>Setor: {data.setor}
            </Text>

          </View>

        </Animated.View>
      </Pressable>
    )
  }


  return (
    <>
      <FlatList
        data={vendedores}
        renderItem={({ item }) => <RenderItem data={item} />}

      />


      <Animated.View
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
        }}
        entering={SlideInDown.delay(500)}

      >
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
      </Animated.View >

    </>
  )
}
