import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';

import CardLoja from '../../componentes/CardLoja';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../servicos/api';

import { useNavigation } from '@react-navigation/native';


export default function Lojas() {

  const navigation = useNavigation()

  const [listaLojas, setListaLojas] = useState([])
  const [lojas, setLojas] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')

  console.log('Pagina Lojas')

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

  function RenderItem({ data }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Loja', data)}
        style={{ flexDirection: "row", alignItems: 'center', marginVertical: 2 }}>

        <Image
          style={{ width: 50, aspectRatio: 1, borderRadius: 30 }}
          source={{ uri: data.logo[0].location }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, flex: 1, borderRadius: 6 }}>

          <View>
            <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{data.nome}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13 }}>{data.produtos.length} produtos </Text>
          </View>

          <Material name='chevron-right' size={24} color='#000' />
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <FlatList
      ItemSeparatorComponent={<View style={{ borderWidth: .5, borderColor: '#ddd' }} />}
      data={busca ? lojas : listaLojas}
      renderItem={({ item }) => <RenderItem data={item} />}
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
