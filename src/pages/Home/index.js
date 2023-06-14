import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { BtnIcone } from '../../styles'

import Produto from '../../componentes/Pdt-feed';
import ListaCategorias from '../../componentes/ListaCategorias';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'


import api from '../../servicos/api';
import Load from '../../componentes/Load';

export default function Home() {
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
    return <Load/>
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
      <View style={{
        backgroundColor: colors.tema,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        height: 57,
        elevation: 5,
        zIndex: 999
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