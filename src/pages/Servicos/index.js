import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import api from '../../servicos/api';

import {useNavigation} from '@react-navigation/native'

export default function Servicos() {

const navigation = useNavigation()

  const [servico, setServico] = useState([])

  useEffect(() => {
    BuscaServicos()
  }, [])

  async function BuscaServicos() {
    try {
      const response = await api.get("/servicos")
      setServico(response.data);

    } catch (error) {

    }

  }

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
      data={servico}
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