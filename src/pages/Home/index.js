import React, { useEffect, useState } from 'react';
import { View,TouchableOpacity,FlatList, RefreshControl,StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoFeed';
import ListaCategorias from '../../componentes/ListaCategorias';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'
import CarrosselServicos from '../../componentes/CarrosselServicos';


export default function Home() {

  const navigation = useNavigation()

  const [carregando, setCarregando] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [servico, setServico] = useState([])
  const [categorias, setCategorias] = useState([])


  function Menu() {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.tela}>

          <TouchableOpacity
              activeOpacity={.9}
              style={styles.botao}
              onPress={() => navigation.navigate("Lojas")}>
              <Material name='storefront-outline' size={24} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
              activeOpacity={.9}
              style={styles.botao}
              onPress={() => navigation.navigate("Servicos")}>
              <Material name='account-outline' size={24} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => navigation.navigate("Menu")}
              activeOpacity={.9}
              style={styles.botao}>
              <Material name='dots-vertical' size={24} color={'#fff'} />
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
    setCarregando(true)

    BuscaProdutos()
    BuscaServicos()
    BuscaCategorias()
  };



  async function BuscaCategorias() {
    try {
      const response = await api.get('/categorias')
      shuffleCategoria(response.data);
      setCarregando(false)

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
      setCarregando(false)
      
    } catch (error) {
      if (error == "AxiosError: Network Error") {
        navigation.navigate("ErroConexao")
      }
    }
  }
  
  
  
  async function BuscaServicos() {
    try {
      const response = await api.get("/servicos")
      shuffleServicos(response.data);
      setCarregando(false)

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
      columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 8 }}
      ListHeaderComponent={
        <>
          <ListaCategorias data={categorias} />
          <CarrosselServicos data={servico} />
        </>

      }
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
      marginLeft:25
  }
  
})