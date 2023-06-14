import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable, Linking, Image } from 'react-native';

import { useRoute } from '@react-navigation/native'
import api from '../../servicos/api';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Vendedores() {
  const route = useRoute()
  const [vendedores, setVendedores] = useState([])

  const [horarioAtendimento, setHorarioAtendimento] = useState(false)

  useEffect(() => {
    BuscaVendedores()
    Horario()
  }, [])

  async function BuscaVendedores() {
    await api.get(`/vendedores?lojaID=${route.params}`)
      .then((response) => {
        setVendedores(response.data);
      })
  }

  // Melhorar a configuração dessa função
  const Horario = () => {
    const atual = new Date()

    if (atual.getHours() > 8 && atual.getHours() < 18) {
      setHorarioAtendimento(true)
    } else {
      setHorarioAtendimento(false)
    }

  }

  function RenderItem({ data }) {
    return (
      <Pressable
        disabled={!horarioAtendimento}
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${data.whatsapp}`)}>
        <Animated.View
          entering={FadeInUp}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            padding: 10,
            marginVertical: 5,
            borderRadius: 6,
            backgroundColor: '#fff'
          }}>

          <Image
            source={{ uri: data.avatar?.location }}
            style={{
              width: 55,
              aspectRatio: 1,
              borderRadius: 55 / 2,
              marginRight: 15
            }} />

          <View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Bold',
                color: '#000',
                fontSize: 18
              }}>
              {data.nome}
            </Text>

            <Text style={{
              fontFamily: 'Roboto-Light',
              color: '#000',
              fontSize: 13
            }}>Setor: {data.setor}
            </Text>

          </View>

        </Animated.View>
      </Pressable>
    )
  }

  return (
    <FlatList
      data={vendedores}
      renderItem={({ item }) => <RenderItem data={item} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
}