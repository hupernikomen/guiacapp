import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import api from '../../servicos/api';

export default function SldLojas() {

  const navigation = useNavigation()
  const { colors, font } = useTheme()

  const [lojas, setLojas] = useState([])

  useEffect(() => {

    ListaLojas()

  }, [])

  async function ListaLojas() {

    await api.get('/usuarios')
      .then((response) => {
        shuffleArray(response.data);
      })
      .catch((error) => {
        console.log(error,"lojas");
      })
  }

  function shuffleArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setLojas(arr);
  }

  const RenderItem = ({ item }) => {
    const { nome, logo, endereco, latlng, telefone } = item

    if (nome != null && endereco != null && latlng != null && logo.length > 0 && telefone != null) {

      return (

        <TouchableOpacity
          onPress={() => navigation.navigate("Loja", item)}
          activeOpacity={.9}
          style={styles.btn}>

          <Image
            // source={{ uri: `http://192.168.0.104:3333/files/logo/${item.logo[0]?.filename}` }}
            source={{ uri: `http://localhost:3333/files/logo/${item.logo[0]?.filename}` }}
            style={styles.logo} />

          <View style={styles.containerinfo}>
            <Text style={styles.nomeloja}>
              {item.nome}
            </Text>
            <Text style={styles.nprodutos}>{item.produtos.length} produtos</Text>
          </View>
        </TouchableOpacity>

      )
    }
  }

  return (
    <View
      style={{
        marginBottom: 20
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Anuncie")}
        activeOpacity={.9}
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: 'space-between',
          paddingRight: 20
        }}>

        <Text style={[styles.titulocabecalhos, { fontFamily: font.gfp }]}>Lojas Parceiras</Text>
        <Text
          style={{
            color: colors.basico,
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
          }}>
          Anuncie Aqui
        </Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        snapToInterval={140}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={lojas}
        renderItem={({ item }) => <RenderItem item={item} />}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 140,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
    margin: 2,
    borderRadius: 4,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginBottom: 20
  },
  nomeloja: {
    fontFamily: 'Roboto-Regular',
    color: '#222',
    fontSize: 16
  },
  nprodutos: {
    color: '#777',
    fontSize: 13,
    fontFamily: 'Roboto-Light',

  },
  titulocabecalhos: {
    fontSize: 18,
    color: '#222',
    marginLeft: 20,
    marginHorizontal: 20,
    marginVertical: 10,

  },
})