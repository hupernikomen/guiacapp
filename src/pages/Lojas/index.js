import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, RefreshControl } from 'react-native';
import Avatar from '../../componentes/Avatar';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../servicos/api';

import { useNavigation, useTheme } from '@react-navigation/native';

import { BtnIcone } from '../../styles'

export default function Lojas() {

  const navigation = useNavigation()
  const { colors } = useTheme()

  const [listaLojas, setListaLojas] = useState([])
  const [lojas, setLojas] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')

  useEffect(() => {

    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => {
          setBusca(event.nativeEvent.text)

        },
        headerIconColor: '#fff',
        textColor: '#fff',
      },
    })

    onRefresh()

  }, [navigation])

  const onRefresh = () => {
    CarregaLojas()
  };


  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  useEffect(() => {
    const listafiltrada = listaLojas.filter((item) => {

      const lojas = item.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const pesquisa = busca.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (lojas.indexOf(pesquisa) > -1) {
        return lojas.indexOf(pesquisa) > -1

      } else {
        return
      }

    });


    setLojas(listafiltrada)
    setCarregando(false)
  }, [busca])

  async function CarregaLojas() {
    const response = await api.get('/lojas')
    setListaLojas(response.data)

  }

  function RenderItem({ item }) {

    return (
      <Pressable
        onPress={() => navigation.navigate('Loja', item.id)}
        style={{ flexDirection: "row", alignItems: 'center', marginVertical: 2 }}>

        <Avatar DATA={item} WIDTH={40} SIZE={12} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, flex: 1, borderRadius: 6 }}>

          <View>
            <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{item.nome}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13 }}>{item.produtos.length} produtos </Text>
          </View>

        </View>
        <Material name='chevron-right' size={24} color='#000' />
      </Pressable>
    )
  }


  return (
      <FlatList
        ItemSeparatorComponent={<View style={{ borderWidth: .5, borderColor: '#ddd' }} />}
        data={busca ? lojas : listaLojas}
        renderItem={({ item }) => <RenderItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={onRefresh}
          />
        }
      />

  );
}
