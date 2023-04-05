import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import api from '../../servicos/api';

import {useNavigation} from '@react-navigation/native'

export default function Servicos() {

const navigation = useNavigation()

  const [listaServicos, setListaServicos] = useState([])
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')

  const [s,setS] =useState("s")

  useEffect(() => {

    listaServicos.length == 1 ? "" : "s"

    navigation.setOptions({
      title: `Serviço${s} Cadastrado${s}`,
      headerSearchBarOptions: {
        onChangeText: (event) => {
          setBusca(event.nativeEvent.text)

        },
        headerIconColor: '#fff',
        textColor: '#fff',
      },
    })

    CarregaServicos()
  }, [])


  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  useEffect(() => {
    const listafiltrada = listaServicos.filter((item) => {

      const servicos = item.tipoServico.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const pesquisa = busca.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (servicos.indexOf(pesquisa) > -1) {
        return servicos.indexOf(pesquisa) > -1

      } else {
        return
      }

    });


    setServicos(listafiltrada)
    setCarregando(false)
  }, [busca])

  async function CarregaServicos() {
    const response = await api.get('/servicos')
    setListaServicos(response.data)

  }




























  // useEffect(() => {
  //   BuscaServicos()
  // }, [])

  // async function BuscaServicos() {
  //   try {
  //     const response = await api.get("/servicos")
  //     setServico(response.data);

  //   } catch (error) {

  //   }

  // }



  const RenderItem = ({ data }) => {
    return (
      <TouchableOpacity
        activeOpacity={.9}
        onPress={() => navigation.navigate("DetalheServico", data)}
        style={styles.card}>

        <Image
          style={{ aspectRatio: 1 }}
          source={{ uri: `http://192.168.0.103:3333/files/servico/${data?.foto[0]?.filename}` }}
        />

        <View style={{
          padding: 20
        }}>


          <View style={{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text
              lineBreakMode='tail'
              style={styles.titulo}>
              {data.tipoServico}
            </Text>
          </View>

          <Text
            style={styles.nome}>
            {data.nome}
          </Text>

        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.tela}>

    <FlatList
      data={busca ? servicos : listaServicos }
      renderItem={({ item }) => <RenderItem data={item} />}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  tela:{
    flex:1,
    padding:14
  },
  card: {
    marginVertical:5,
    backgroundColor: '#fff',
    elevation: 1,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden'
  },
  titulo: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: "#000",
  },
  nome: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#000',
  },
  bio: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    color: '#000'
  }
})