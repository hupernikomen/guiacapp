import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native'
import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

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

        <View style={{ flexDirection:"row", justifyContent:"space-between" }}>

          <Text style={estilo.nome}>
            {data.nome}
          </Text>
          <Material name='chevron-right' size={30} color='#000' />
        </View>

        <Text style={{ color: '#000', fontFamily: 'Roboto-Light', marginTop:-5 }}>{data._count?.profissional} profissiona{data._count?.profissional > 1 ? 'is':'l'} </Text>



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
        elevation: 5
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
          fontSize: 22
        }}>Serviços</Text>


          <Pressable
             style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 58,
              width: 58
            }}
            onPress={() => navigation.navigate("Search")}>
            <Feather name='search' size={24} color={app.texto} />
          </Pressable>

      </View>
    )
  }

  return (

    <FlatList
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={<Header />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={<View style={{ borderColor: '#eee', borderWidth: .5 }} />}
      data={listaServicos}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
  );
}

