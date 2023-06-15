import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable, Linking, Image } from 'react-native';

import { useRoute } from '@react-navigation/native'
import api from '../../servicos/api';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Vendedores() {
  const route = useRoute()
  const [vendedores, setVendedores] = useState([])


  useEffect(() => {
    BuscaVendedores()

  }, [])

  async function BuscaVendedores() {
    await api.get(`/vendedores?lojaID=${route.params}`)
      .then((response) => {
        setVendedores(shuffle(response.data));
      })
  }

  // Melhorar a configuração dessa função
  function Horario({ horario }) {

    const horarionovo = JSON.parse(horario)

    const atual = new Date()

    if (atual.getHours() > Number(horarionovo?.e) && atual.getHours() < Number(horarionovo?.a) || atual.getHours() > Number(horarionovo?.r) && atual.getHours() < Number(horarionovo?.s)) {
      return true
    } else {
      return false
    }

  }

  
  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  function RenderItem({ data }) {

    const disponivel = Horario(data)

    return (
      <Pressable
      style={{opacity:disponivel?1:.6}}
        disabled={!disponivel}
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${data.whatsapp}`)}>
        <Animated.View
          entering={FadeInUp}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 5,
            borderRadius: 6,
            backgroundColor: '#fff',
          }}>

          <Image
            source={{ uri: data.avatar?.location }}
            style={{
              width: 55,
              aspectRatio: 1,
              borderRadius: 55 / 2,
              marginRight: 15
            }} />

          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Roboto-Bold',
                color: '#000',
                fontSize: 18
              }}>

              {data.nome}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>


              <Text style={{
                fontFamily: 'Roboto-Light',
                color: '#000',
                fontSize: 13
              }}>Setor: {data.setor}
              </Text>

              <View style={{ alignItems: "center", flexDirection: 'row' }}>

                <View style={{ width: 8, height: 8, backgroundColor: disponivel ? '#388E3C' : '#aaa', borderRadius: 5 }} />
                <Text style={{ fontSize: 13, marginLeft: 5, color: disponivel ? '#388E3C' : '#aaa' }}>{disponivel ? 'Online' : 'Off'}</Text>

              </View>
            </View>

          </View>



        </Animated.View>
      </Pressable>
    )
  }

  return (<>
    <FlatList
      data={vendedores}
      renderItem={({ item }) => <RenderItem data={item} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  </>
  );
}