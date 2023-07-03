import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'

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
    await api.get('/profissoes')
      .then((response) => {

        setLoad(false)
        setListaServicos(response.data)
      })
      .catch((error) => {
        console.log("Error Carrega Serviços:", error);
      })

  }

  const RenderItem = ({ data }) => {
    if (data._count?.profissional === 0) return

    return (
      <Pressable style={estilo.card}
        activeOpacity={.9}
        onPress={() => navigation.navigate("Profissionais", data)}>

        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Material name={data.avatar} size={28} color='#000' />

          <Text style={estilo.nome}>
            {data.nome}
          </Text>
        </View>
        
        <Text>{data._count?.profissional}</Text>

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

