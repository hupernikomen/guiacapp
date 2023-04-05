import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Linking, StyleSheet } from 'react-native';

import { useRoute, useTheme, useNavigation } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function DetalheServico() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { width } = Dimensions.get('window')


  const route = useRoute()

  const [servico, setServico] = useState([])

  useEffect(() => {
    setServico(route.params)

    navigation.setOptions({
      title: route.params?.nome,
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${servico.telefone}`)}
            activeOpacity={.9}>

            <Material name='whatsapp' size={26} color='#fff' />
          </TouchableOpacity>
        )
      }

    })



  }, [])

  return (
    <View style={{
      flex: 1
    }}>
      {console.log(servico)}

      <Image
        source={{ uri: `http://192.168.0.103:3333/files/servico/${route.params?.foto[0]?.filename}` }}
        style={{
          width: width,
          height: 150
        }}
      />

      <View style={styles.detalhes}>
        <Text style={styles.servico}>
          {servico.tipoServico}
        </Text>

        <Text style={styles.bio}>{servico.bio}</Text>

     

        <View style={styles.endereco}>
          <Text style={styles.tituloendereco}>Atendemos no endereço:</Text>
          <Text style={styles.infoendereco}>{servico.endereco}</Text>

          {servico.aDomicilio &&
          <View style={styles.adomicilio}>

            <Material name='truck' size={28} color={colors.vartema} />
            <Text style={styles.infodomicilio}>Prestamos serviço à domicilio</Text>
          </View>
        }

          {servico.latlng != null &&
            <TouchableOpacity
              style={[styles.btnmapa, { backgroundColor: colors.tema }]}>
              <Text style={styles.txtmapa}>Ver no mapa</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  detalhes: {
    padding: 20
  },
  servico: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    color: '#000',
    marginBottom: 5
  },
  bio: {
    color: '#000',
    fontFamily: 'Roboto-Light'
  },
  adomicilio: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoendereco: {
    color: '#000',
    fontFamily: 'Roboto-Light',
  },
  infodomicilio: {
    marginLeft: 20
  },
  tituloendereco: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    color: '#000',
    marginBottom: 5
  },
  endereco: {
    marginTop: 20
  },
  btnmapa: {
    marginTop: 40,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtmapa: {
    color: '#fff'
  }
})