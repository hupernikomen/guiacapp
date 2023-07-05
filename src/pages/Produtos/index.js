import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Pressable } from 'react-native';

import Produto from '../../componentes/Produto-Feed';

import { useNavigation, useTheme } from '@react-navigation/native'
import api from '../../servicos/api';
import Load from '../../componentes/Load';

import Feather from 'react-native-vector-icons/Feather'


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
        }}>Produtos</Text>


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

      ListHeaderComponent={<Header />}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginVertical: 2, gap: 4, paddingHorizontal: 4 }}
      contentContainerStyle={{ paddingBottom: 75 }}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}

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