import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../servicos/api';

import { useNavigation, useTheme } from '@react-navigation/native'

import { BtnIcone } from '../../styles'

export default function Servicos() {

  const navigation = useNavigation()
  const { colors } = useTheme()

  const [listaServicos, setListaServicos] = useState([])
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(false)
  const [busca, setBusca] = useState('')

  useEffect(() => {

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


  const RenderItem = ({ data }) => {
    return (
      <Pressable
        activeOpacity={.9}
        onPress={() => navigation.navigate("DetalheServico", data)}
        style={styles.card}>

        <Image
          style={{ aspectRatio: 1 }}
          source={{ uri: data?.foto[0]?.location }}
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

      </Pressable>
    )
  }


  return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={busca ? servicos : listaServicos}
        renderItem={({ item }) => <RenderItem data={item} />}
      />
  );
}

const styles = StyleSheet.create({

  card: {
    marginVertical: 5,
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