import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, RefreshControl } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../servicos/api';

import { useNavigation, useTheme } from '@react-navigation/native';


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
    setListaLojas(shuffle(response.data))

  }

  
  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }

  function RenderItem({ item }) {

    if (item.produtos.length === 0) {
      return
    }

    return (
      <Pressable
        onPress={() => navigation.navigate('Loja', item.id)}
        style={{ flexDirection: "row", alignItems: 'center', marginVertical: 2 }}>


        {
          item?.avatar &&
          <Image
            style={{ width: 40, aspectRatio: 1, borderRadius:20 }}
            source={{ uri: item?.avatar?.location }} />
        }

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
