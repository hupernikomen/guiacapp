import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';

import Produto from '../../componentes/Produtos/pdt-feed';
import ListaCategorias from '../../componentes/ListaCategorias';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'
import CarrosselServicos from '../../componentes/CarrosselServicos';
import CarrosselBanners from '../../componentes/CarrosselBanners';

import { BtnIcone } from '../../styles'


export default function Home() {

  console.log('RENDERIZOU');

  const navigation = useNavigation()

  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])
  // const [servico, setServico] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    onRefresh()
    Menu()

  }, [])

  const onRefresh = () => {
    BuscaCategorias()
    BuscaProdutos()
  };


  function Menu() {

    navigation.setOptions({
      headerLeft: () => {
        return (
          <BtnIcone
            lado={'flex-start'}
            onPress={() => navigation.navigate("Menu")}
            activeOpacity={.9}>
            <Material name='menu' size={24} color={'#fff'} />
          </BtnIcone>
        )
      },
      headerRight: () => {
        return (
          <>

            <BtnIcone
              lado={'flex-end'}
              onPress={() => navigation.navigate("Lojas")}>
              <Material name='storefront-outline' size={24} color='#fff' />
            </BtnIcone>

            <BtnIcone
              lado={'flex-end'}
              onPress={() => navigation.navigate("Search")}>
              <Material name='magnify' size={24} color='#fff' />
            </BtnIcone>
          </>
        )
      }
    })
  }

  async function BuscaCategorias() {
    try {
      const response = await api.get('/categorias')
      shuffleCategoria(response.data);

    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
      }
    }
  }

  async function BuscaProdutos() {

    try {
      const response = await api.get('/produtos')
      shuffleProdutos(response.data)



    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
      }
    }
  }


  function shuffleCategoria(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCategorias(arr);
  }

  function shuffleProdutos(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setProdutos(arr);
  }


  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
      ListHeaderComponent={
        <>
          <ListaCategorias data={categorias} />
          {/* <CarrosselBanners data={banners} /> */}
          {/* {servico.length > 0 && <CarrosselServicos data={servico} />} */}
        </>

      }
      stickyHeaderHiddenOnScroll={true}
      StickyHeaderComponent={[0]}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

      refreshControl={
        <RefreshControl
          refreshing={carregando}
          onRefresh={onRefresh}
        />
      }

    />

  )
}