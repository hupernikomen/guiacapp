import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import Produto from '../../componentes/Produtos/pdt-feed';
import ListaCategorias from '../../componentes/ListaCategorias';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation, useTheme } from '@react-navigation/native'
import CarrosselServicos from '../../componentes/CarrosselServicos';
import CarrosselBanners from '../../componentes/CarrosselBanners';

import { BtnIcone } from '../../styles'


export default function Home() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [servico, setServico] = useState([])

  console.log("Render Home");

  useEffect(() => {
    onRefresh()

  }, [])

  const onRefresh = () => {
    BuscaProdutos()

  };

  



  async function BuscaProdutos() {
    await api.get('/produtos')
      .then((response) => {
        let embaralhado = shuffle(response.data)
        setProdutos(embaralhado)
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
      <View style={{
        backgroundColor: colors.tema,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        height: 57,
      }}>

        <BtnIcone
          lado={'center'}
          onPress={() => navigation.openDrawer()}>
          <Material name='menu' size={24} color={'#fff'} />
        </BtnIcone>


        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: 15,
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            color: '#fff',
          }}>Guia Comercial</Text>


        <BtnIcone
          lado={'center'}
          onPress={() => navigation.navigate("Search")}>
          <Material name='magnify' size={24} color='#fff' />
        </BtnIcone>


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
            {servico.length > 0 && <CarrosselServicos data={servico} />}
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
    </>

  )
}