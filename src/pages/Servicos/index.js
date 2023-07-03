import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native'
import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'

import estilo from './estilo';
import Load from '../../componentes/Load';

export default function Servicos() {

  const navigation = useNavigation()

  const [listaServicos, setListaServicos] = useState([])
  const [load, setLoad] = useState(false)
  
  const { app } = useTheme()

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
  function Header() {
    return (
      <View style={{
        height: 58,
        backgroundColor: app.tema,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        elevation:5
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 58,
            width: 58
          }}>
            <Pressable
              onPress={() => navigation.openDrawer()}>
              <Material name='menu' size={24} color={app.texto} />
            </Pressable>
          </View>
          <Text style={{
            fontFamily: 'Roboto-Medium',
            marginLeft: 10,
            color: '#fff',
            fontSize: 20
          }}>Guia Comercial</Text>
        </View>


        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 58,
          width: 58
        }}>
          <Pressable
            style={{ padding: 10 }}
            onPress={() => navigation.navigate("Search")}>
            <Material name='magnify' size={24} color={app.texto} />
          </Pressable>

        </View>
      </View>
    )
  }

  return (

    <FlatList
    stickyHeaderHiddenOnScroll={true}
    stickyHeaderIndices={[0]}
    ListHeaderComponent={<Header />}
      showsVerticalScrollIndicator={false}
      data={listaServicos}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
  );
}

