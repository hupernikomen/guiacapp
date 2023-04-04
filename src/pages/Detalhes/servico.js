import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Linking, StyleSheet } from 'react-native';

import { useRoute, useTheme } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function DetalheServico() {
  const { colors } = useTheme()

  const { width } = Dimensions.get('window')


  const route = useRoute()

  const [servico, setServico] = useState([])

  useEffect(() => {
    setServico(route.params)

  }, [])

  return (
    <View style={{
      flex: 1
    }}>
      <View style={{
        marginBottom: 40
      }}>

        <Image
          source={{ uri: `http://192.168.0.103:3333/files/servico/${route.params?.foto[0]?.filename}` }}
          style={{
            width: width,
            height: 150
          }}
        />

        <Text style={[styles.servico, { backgroundColor: colors.vartema, }]}>
          {servico.tipoServico}
        </Text>
      </View>

      <View style={{
        margin: 20
      }}>

        <View style={styles.containeritem}>
          <Text style={styles.tituloitem}>Profissional:</Text>
          <Text style={styles.item}>{servico.nome}</Text>
        </View>

        <View style={styles.containeritem}>
          <Text style={styles.tituloitem}>Detalhes do serviço:</Text>
          <Text style={styles.item}>{servico.bio}</Text>
        </View>

        <View style={styles.containeritem}>
          <Text style={styles.tituloitem}>Endereço:</Text>
          <Text style={styles.item}>{servico.endereco}</Text>
        </View>

        <Text style={styles.item}>A Domicilio: {servico.aDomicilio ? "Sim" : "Não"}</Text>

      </View>

      <TouchableOpacity
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${servico.telefone}`)}
        activeOpacity={.9}
        style={[styles.whatsapp, { backgroundColor: colors.vartema }]}>
          
        <Material name='whatsapp' size={28} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containeritem: {
    marginBottom: 20
  },
  servico: {
    elevation: 5,
    color: '#fff',
    marginLeft: 20,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontFamily: 'Roboto-Regular',
    marginTop: 135,
    position: "absolute"
  },
  tituloitem: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    marginBottom:5
  },
  item: {
    fontSize: 16,
    fontFamily: 'Roboto-Light',
    color: '#000'
  },
  whatsapp: {
    position: "absolute",
    bottom: 30,
    right: 20,

    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
})