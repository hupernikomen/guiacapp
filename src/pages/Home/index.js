import React, { useEffect, useState } from 'react';
import { View,TouchableOpacity,FlatList, RefreshControl,StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoFeed';
import ListaCategorias from '../../componentes/ListaCategorias';

import api from '../../servicos/api';

import Ico from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'
import CarrosselServicos from '../../componentes/CarrosselServicos';
import CarrosselBanners from '../../componentes/CarrosselBanners';


export default function Home() {

  const navigation = useNavigation()

  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [servico, setServico] = useState([])
  const [categorias, setCategorias] = useState([])

  function Menu() {
    navigation.setOptions({
      headerLeft: () =>{
        return(
          <TouchableOpacity
              onPress={() => navigation.navigate("Menu")}
              activeOpacity={.9}
              style={styles.botaomenu}>
              <Ico name='menu' size={22} color={'#fff'} />
          </TouchableOpacity>
        )
      },
      headerRight: () => {
        return (
          <View style={styles.tela}>

          <TouchableOpacity
              activeOpacity={.9}
              style={styles.botao}
              onPress={() => navigation.navigate("Lojas")}>
              <Ico name='storefront-outline' size={22} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
              activeOpacity={.9}
              style={styles.botao}
              onPress={() => navigation.navigate("Servicos")}>
              <Ico name='room-service-outline' size={22} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
              activeOpacity={.9}
              style={styles.botao}
              onPress={() => navigation.navigate("Search")}>
              <Ico name='magnify' size={22} color={'#fff'} />
          </TouchableOpacity>



      </View>
        )
      }
    })
  }

  useEffect(() => {
    onRefresh()
    Menu()
  }, [])

  const onRefresh = () => {
    
    BuscaProdutos()
    BuscaServicos()
    BuscaCategorias()
  };
  
  
  
  async function BuscaCategorias() {
    setCarregando(true)
    try {
      const response = await api.get('/categorias')
      shuffleCategoria(response.data);
      setCarregando(false)
      
    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
        setCarregando(false)
      }
    }
  }
  
  async function BuscaProdutos() {
    setCarregando(true)
    
    try {
      const response = await api.get('/produtos')
      shuffleProdutos(response.data)
      setCarregando(false)
      
    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
        setCarregando(false)
      }
    }
  }
  
  
  
  async function BuscaServicos() {
    setCarregando(true)
    try {
      const response = await api.get("/servicos")
      shuffleServicos(response.data);
      setCarregando(false)
      
    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
        setCarregando(false)
      }
    }
  }

  const [banners,setBanners] = useState([
    'https://www.designi.com.br/images/preview/10023726.jpg',
    'https://www.designi.com.br/images/preview/10046780.jpg',
    'https://www.bioage.com.br/media/slides/Lan_amento_Base_Stick_Marrom_Escuro_Banner_Mobile.png',
    'https://marketplace.canva.com/EAFSrBoL46o/2/0/1600w/canva-feliz-natal-banner-paisagem-prata-e-vermelho-orpsmHqoWOA.jpg'
  ])



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

  function shuffleServicos(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setServico(arr);
  }


  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
      ListHeaderComponent={
        <>
          <ListaCategorias data={categorias} />
          <CarrosselBanners data={banners}/>
          <CarrosselServicos data={servico} />
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


const styles = StyleSheet.create({
  tela: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    
  },
  botao: {
      paddingLeft:25,
      height: 50,
      justifyContent:'center'
  },
  botaomenu: {
      paddingRight:25,
      height: 50,
      justifyContent:'center'
  }
  
})