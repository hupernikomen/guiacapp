import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Pressable } from 'react-native';

import Produto from '../../componentes/Produto-Feed';

import { useNavigation, useTheme } from '@react-navigation/native'
import api from '../../servicos/api';
import Load from '../../componentes/Load';
import Postos from '../Postos';

import Feather from 'react-native-vector-icons/Feather'
import Banners from '../../componentes/Carroussel-Banners'

export default function Produtos() {
  const navigation = useNavigation()

  const [load, setLoad] = useState(false)
  const [produtos, setProdutos] = useState([])

  const { app } = useTheme()

  useEffect(() => {

    BuscaProdutos()

  }, [])



  if (load) {
    return <Load />
  }

  async function BuscaProdutos() {
    setLoad(true)
    await api.get('/produtos')
      .then((response) => {
        setProdutos(shuffle(response.data))
        setLoad(false)
      })
      .catch((error) => {
        if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") }
        setLoad(false)
      })
  }

  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  function Header() {
    return (
      <>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          backgroundColor: app.tema,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
          }}>

            <Pressable onPress={() => navigation.openDrawer()} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              width: 45,
              aspectRatio: 1,
            }}>

              <Feather name='menu' size={24} color={'#fff'} />

            </Pressable>

            <View style={{
              flex: 1,
              marginRight: 5,
              marginLeft: 10
            }}>

              <Text numberOfLines={1} lineBreakMode='tail' style={{
                fontFamily: 'Roboto-Medium',
                color: '#fff',
                fontSize: 20,
              }}>
                Guia Comercial
              </Text>

            </View>

          </View>
          <View>
            <View style={{ flexDirection: 'row', gap: 2 }}>

              <Pressable onPress={() => navigation.navigate("CategoriasFavoritas")} style={{
                width: 45,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: "center"
              }}>

              </Pressable>
              <Pressable onPress={() => navigation.navigate("Search")} style={{
                width: 45,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: "center"
              }}>

              </Pressable>
            </View>
          </View>
        </View>
      </>

    )
  }

  function Topo() {
    return (
      <>
        <Header />
        <Banners />
        <Postos />

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>

          <Text style={{
            fontFamily: "Roboto-Bold",
            fontSize: 20,
            color: '#000',
          }}>
            Produtos
          </Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>

            <Pressable onPress={() => navigation.navigate("CategoriasFavoritas")} style={{
              width: 40,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Feather name='filter' size={app.icone} color={'#000'} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Search")} style={{
              width: 40,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Feather name='search' size={app.icone} color={'#000'} />
            </Pressable>
          </View>
        </View>
      </>
    )
  }


  return (
    <FlatList
    
      ListHeaderComponent={<Topo />}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginBottom: 4, gap: 4, paddingHorizontal: 4 }}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}
      refreshControl={
        <RefreshControl
          refreshing={load}
          onRefresh={() => {
            BuscaProdutos()

          }}
        />
      }
    />
  )
}