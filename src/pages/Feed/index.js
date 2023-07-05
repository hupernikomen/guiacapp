import { useState } from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, FlatList, Pressable, ScrollView, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'

import Animated, { FadeInRight } from 'react-native-reanimated';
import { useEffect } from 'react';
import api from '../../servicos/api';

export default function Feed() {

  const [load, setLoad] = useState(false)
  const { app } = useTheme()
  const navigation = useNavigation()

  const [postos, setPostos] = useState([])

  const [selecaoCombustivel, setSelecaoCombustivel] = useState(0)
  const combustiveis = [
    {
      tipo: "Gasolina",
      cor: '#3CB371'
    },
    {
      tipo: "Etanol",
      cor: '#F0A30A'
    },
    {
      tipo: "Diesel",
      cor: '#333'
    }
  ]

  useEffect(() => {

    BuscaPosto()
    BuscaCombustivel()

  }, [])

  async function BuscaCombustivel() {
    await AsyncStorage.getItem('@combustivelGuiaComercial')
      .then((response) => {

        if (response == null) {
          return
        }

        setSelecaoCombustivel(JSON.parse(response))
      })

  }

  async function BuscaPosto() {

    setLoad(true)

    await api.get('/postos')
      .then((response) => {
        setPostos(shuffle(response.data))
        setLoad(false)
      })
      .catch((error) => {
        console.log("Erro Postos Feed", error)
        setLoad(false)
      })
  }


  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  function RenderItem({ data }) {

    const preco = parseFloat(Object.values(JSON.parse(data.tabela))[selecaoCombustivel]).toFixed(2).replace('.', ',')

    return (
      <Pressable onPress={() => navigation.navigate("Mapa", data.usuarioID)}>

        <Animated.View entering={FadeInRight.duration(800)} style={{
          minWidth: 150,
          height: 80,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 6
        }}>
          <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <Text style={{ fontFamily: 'Roboto-Regular', color: '#000', fontSize: 13 }}>{data.nome}</Text>
              <Image source={{ uri: data.avatar?.location }} style={{
                width: 18, aspectRatio: 1
              }} />
            </View>
            <Text style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>R$ {preco}</Text>
          </View>

          <View style={{
            alignSelf: 'flex-end',
          }}>
            <Feather name='map' />
          </View>
        </Animated.View>

      </Pressable>
    )
  }

  async function SelecaoCombustivel(index) {

    setSelecaoCombustivel(index)

    await AsyncStorage.setItem('@combustivelGuiaComercial', JSON.stringify(index))
  }


  function Header() {
    return (
      <View style={{
        height: 58,
        backgroundColor: app.tema,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>


        <Pressable style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 58,
          width: 58
        }}
          onPress={() => navigation.openDrawer()}>
          <Feather name='menu' size={24} color={app.texto} />
        </Pressable>

        <Text style={{
          fontFamily: 'Roboto-Medium',
          marginLeft: 10,
          color: '#fff',
          fontSize: 20
        }}>Guia Comercial</Text>


        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 58,
            width: 58
          }}
          onPress={() => navigation.navigate("Search")}>
        </Pressable>

      </View>
    )
  }


  return (
    <ScrollView>

      <Header />
      <View style={{
        marginVertical: 10,
        paddingVertical: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#ccc',
        borderTopWidth: .5,
        borderTopColor: '#ccc',
      }}>


        <FlatList
          contentContainerStyle={{ gap: 5, padding: 10 }}
          snapToInterval={155}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={postos}
          renderItem={({ item }) => <RenderItem data={item} />}
        />

        <View style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginVertical: 10,
          gap: 5
        }}>

          {combustiveis.map((item, index) => {
            return (

              !load && <Pressable key={index} onPress={() => SelecaoCombustivel(index)} style={{
                backgroundColor: selecaoCombustivel == index ? item.cor : 'transparent',
                flexDirection: 'row',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,


              }}><Text style={{
                color: selecaoCombustivel == index ? '#fff' : '#222',
                fontSize: 12,
                fontFamily: 'Roboto-Regular'
              }}>{item.tipo}</Text>
              </Pressable>
            )
          })}
        </View>

      </View>
    </ScrollView>
  );
}