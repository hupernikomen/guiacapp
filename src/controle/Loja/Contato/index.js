import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, Pressable, FlatList, Image } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../../contexts/lojaContext';

import { useTheme, useNavigation } from '@react-navigation/native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import api from '../../../servicos/api';
import estilo from './estilo';


export default function Contato() {

  const { credenciais, Toast } = useContext(LojaContext)
  const { admin } = useTheme()
  const navigation = useNavigation()

  const [idSelecionado, setIdSelecionado] = useState(null)

  const [contato, setContato] = useState([])

  useLayoutEffect(() => {
    BuscaContato()

  }, [])



  async function BuscaContato() {
    await api.get(`/contatos?usuarioID=${credenciais.id}`)
      .then((response) => {
        setContato(response.data);
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
        BuscaContato()
      })

  }


  // Pega o horario do vendedor e converte em um hora calculavel
  const converteHorario = (ponto) => {
    return new Date(ponto).toLocaleTimeString().substring(0, 5)
  }


  function RenderItem({ data }) {

    if (data.horario == null) {
      return
    }

    const { e: entrada, a: almoco, r: retorno, s: saida } = JSON.parse(data?.horario)

    return (
      <Pressable
        onLongPress={() => setIdSelecionado(data.id)}>

        <View
          style={{
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 15,
            borderRadius: 6,
            backgroundColor: '#fff'
          }}>

          <Image
            source={{ uri: data.avatar?.location }}
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 55 / 2,
              marginRight: 20
            }} />

          <View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Medium',
                color: '#000',
                fontSize: 16
              }}>
              {data.nome}
            </Text>


            <Text style={{ fontFamily: "Roboto-Light", color: '#000', fontSize: 12 }}>{converteHorario(entrada)} - {converteHorario(almoco)} - {converteHorario(retorno)} - {converteHorario(saida)} </Text>
          </View>


          {idSelecionado === data.id &&
            <Animated.View
              entering={FadeInRight}
            >

              <Pressable
                style={{ backgroundColor: admin.tema, borderRadius: 6, width: 40, aspectRatio: 1, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}
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
        contentContainerStyle={{ gap: 5, padding: 5 }}
        data={contato}
        renderItem={({ item }) => <RenderItem data={item} />}
      />

      <View style={[estilo.container_botao_mais, { backgroundColor: admin.botao }]}>

        <Pressable style={estilo.botao_mais} onPress={() => navigation.navigate("CadastrarVendedor")}>

          <Material name='plus-thick' size={26} color='#fff' />
        </Pressable >
      </View >

    </>
  )
}
