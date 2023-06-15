import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, View, Pressable } from 'react-native';

import Produto from '../../componentes/Produto-Feed';
import ListaCategorias from '../../componentes/Lista-Categorias';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'


import api from '../../servicos/api';
import Load from '../../componentes/Load';
import estilo from './estilo';
import CarrosselBanners from '../../componentes/Carroussel-Banners';

export default function Feed() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const [load, setLoad] = useState(false)
  const [produtos, setProdutos] = useState([])
  // const [servico, setServico] = useState([])

  useFocusEffect(
    useCallback(() => {
      let ativo = true
      onRefresh()

      return () => {
        ativo = false
      }
    }, [])
  )


  if (load) {
    return <Load />
  }

  const onRefresh = () => {
    BuscaProdutos()

  };

  async function BuscaProdutos() {
    setLoad(true)
    await api.get('/feed')
      .then((response) => {
        setProdutos(shuffle(response.data))
        setLoad(false)
      })
      .catch((error) => { if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") } })
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
      <View style={[estilo.container_header, { backgroundColor: colors.tema, }]}>

        <Pressable
          style={estilo.icone}
          onPress={() => navigation.openDrawer()}>
          <Material name='menu' size={24} color={'#fff'} />
        </Pressable>


        <Text
          numberOfLines={1}
          style={estilo.titulo}>Guia Comercial</Text>


        <Pressable
          style={estilo.icone}
          onPress={() => navigation.navigate("Search")}>
          <Material name='magnify' size={24} color='#fff' />
        </Pressable>

      </View>
    )
  }




  return (
    <>
      <Header />
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
        ListHeaderComponent={
          <>
            <ListaCategorias />
            {/* <CarrosselBanners/> */}
            {/* {servico.length > 0 && <CarrosselServicos data={servico} />} */}
          </>
        }
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        data={produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}

        refreshControl={
          <RefreshControl
            refreshing={load}
            onRefresh={onRefresh}
          />
        }

      />

    </>
  )
}