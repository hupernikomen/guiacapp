import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';

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
      <TouchableOpacity
        onPress={() => navigation.navigate('Loja', item.id)}
        style={{ flexDirection: "row", alignItems: 'center', marginVertical: 2 }}>

        {!!item.logo.length ?

          <Image
            style={{ width: 50, aspectRatio: 1, borderRadius: 30 }}
            source={{ uri: item.logo[0]?.location }}
          /> :
          <View style={{ width: 50, aspectRatio: 1, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: "Roboto-Black", color: '#000' }}>{item.nome.trim().split(' ')[0].substring(0, 1) + item.nome.trim().split(' ')[1].substring(0, 1)}</Text>
          </View>
        }

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, flex: 1, borderRadius: 6 }}>

          <View>
            <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{item.nome}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13 }}>{item.produtos.length} produtos </Text>
          </View>

        </View>
          <Material name='chevron-right' size={24} color='#000' />
      </TouchableOpacity>
    )
  }

  function Header() {
    return (
      <View style={{
        backgroundColor: colors.tema,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        height: 57,
      }}>

        <BtnIcone
          lado={'center'}
          onPress={() => navigation.goBack()}>
          <Material name='arrow-left' size={24} color='#fff' />
        </BtnIcone>


        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: 15,
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            color: '#fff',
          }}>Lojas Parceiras</Text>


      </View>

    )
  }


  return (
    <>

      <Header />
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
    </>

  );
}
