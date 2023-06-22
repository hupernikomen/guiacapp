import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation, useTheme } from '@react-navigation/native'

import estilo from './estilo';
import Load from '../../componentes/Load';

export default function Servicos() {

  const navigation = useNavigation()

  const [listaServicos, setListaServicos] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {

    CarregaServicos()
  }, [])


  if (load) {
    return <Load />
  }


  async function CarregaServicos() {
    setLoad(true)
    await api.get('/servicos')
      .then((response) => {

        setLoad(false)
        setListaServicos(response.data)
      })

  }


  const RenderItem = ({ data }) => {
    return (
      <Pressable
        activeOpacity={.9}
        onPress={() => navigation.navigate("Profissionais", data)}
        style={estilo.card}>

        <Text
          style={estilo.nome}>
          {data.nome}
        </Text>


        <Material name={data.icone} size={24} color='#000' />

      </Pressable>
    )
  }


  return (
    <FlatList

      showsVerticalScrollIndicator={false}
      data={listaServicos}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
  );
}

