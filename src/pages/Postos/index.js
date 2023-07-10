import { useState } from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, FlatList, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'

import Load from '../../componentes/Load';

import Animated, { FadeInRight } from 'react-native-reanimated';
import { useEffect } from 'react';
import api from '../../servicos/api';



export default function Feed() {

  const [load, setLoad] = useState(false)
  const navigation = useNavigation()
  const { width } = Dimensions.get('window')

  const [postos, setPostos] = useState([])

  const [selecaoCombustivel, setSelecaoCombustivel] = useState(0)
  const combustiveis = [
    {
      tipo: "Gasolina",
      cor: '#0071bc',
    },
    {
      tipo: "Etanol",
      cor: '#f77c1e',
    },
    {
      tipo: "Diesel",
      cor: '#333',
    }
  ]

  useEffect(() => {

    BuscaPosto()

  }, [])


  async function BuscaPosto() {

    await api.get('/postos')
      .then((response) => {
        setPostos(shuffle(response.data))
      })
      .catch((error) => {
        console.log("Erro Postos Feed", error)
      })

    await AsyncStorage.getItem('@combustivelGuiaComercial')
      .then((response) => {
        if (response == null) {
          return
        }

        setSelecaoCombustivel(JSON.parse(response))
      })
  }


  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  // Recebe valor e converte no formato de moeda
  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  function RenderItem({ data }) {

    const preco = parseFloat(Object.values(JSON.parse(data.tabela))[selecaoCombustivel])

    return (

      <Pressable onPress={() => navigation.navigate("Mapa", data.usuarioID)}>

        <Animated.View entering={FadeInRight.duration(800)} style={{
          minWidth: (width / 2) - 25,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderWidth: .5,
          borderColor: '#aaaaaa70',
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderRadius: 6
        }}>
          <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{formateValor(preco)}</Text>

              <Image source={{ uri: data.avatar?.location }} style={{
                width: 18, aspectRatio: 1
              }} />
            </View>
            <Text style={{
              fontFamily: 'Roboto-Regular',
              color: '#000',
              fontSize: 14
            }}>{data.nome}</Text>
          </View>

        </Animated.View>
        <Text style={{
          paddingHorizontal:13,
          marginVertical:5,
          fontFamily: 'Roboto-Light',
          fontSize: 13,
          color: '#000'
        }}>Mapa do posto</Text>



      </Pressable>
    )
  }

  async function SelecaoCombustivel(index) {

    setSelecaoCombustivel(index)

    await AsyncStorage.setItem('@combustivelGuiaComercial', JSON.stringify(index))
  }

  return (
    <View style={{
      gap: 10,
      paddingVertical: 15,
      backgroundColor: '#FFF',
      marginBottom: 5
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
      }}>

        <Text style={{
          fontFamily: "Roboto-Bold",
          fontSize: 20,
          color: '#000',
        }}>
          Combustíveis
        </Text>

        <View style={{
          gap: 2,
          flexDirection: "row"
        }}>

          {combustiveis.map((item, index) => {
            return (

              !load && <Pressable key={index} onPress={() => SelecaoCombustivel(index)} style={{
                backgroundColor: selecaoCombustivel == index ? item.cor : 'transparent',
                flexDirection: 'row',
                borderRadius: 6,
                paddingHorizontal: 10,
                paddingVertical: 4,


              }}><Text style={{
                color: selecaoCombustivel == index ? '#fff' : '#222',
                fontSize: 13,
                fontFamily: 'Roboto-Regular'
              }}>{item.tipo}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ gap: 5, paddingHorizontal: 10 }}
        snapToInterval={(width / 2) - 27.5}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={postos}
        renderItem={({ item }) => <RenderItem data={item} />}
      />


    </View>

  );
}