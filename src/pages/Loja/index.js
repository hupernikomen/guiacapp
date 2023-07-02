import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import api from '../../servicos/api';

import Load from '../../componentes/Load';
import Produto from '../../componentes/Produto-Feed';


import Material from "react-native-vector-icons/MaterialCommunityIcons"
import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import Animated, { SlideInDown } from 'react-native-reanimated';

export default function Loja() {

  const navigation = useNavigation()
  const route = useRoute()
  const { app } = useTheme()

  const [loja, setLoja] = useState([])
  const [load, setLoad] = useState(false)
  const [marker, setMarker] = useState(null)

  const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const [region, setRegion] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067,
    ...delta
  })

  useEffect(() => {
    BuscaLoja()

    
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: loja?.nome,
      headerRight: () => {
        return (
          <View style={{ flexDirection: 'row', gap: 20 }}>

            <Pressable
              onPress={() => navigation.navigate("Contato", loja?.usuario?.id)}>
              <Material name='whatsapp' size={26} color='#fff' />
            </Pressable>
            {loja?.usuario?.mapa && <Pressable
              onPress={() => navigation.navigate('Mapa', loja?.usuario?.id)}>
              <Material name='google-maps' size={26} color={app.texto} />
            </Pressable>}
          </View>

        )
      }
    })
  },[loja])


  if (load) {
    return <Load />
  }

  async function BuscaLoja() {
    setLoad(true)
    await api.get(`/loja?usuarioID=${route.params}`)
      .then(({ data }) => {
        setLoja(data)


        setLoad(false)
      })
      .catch(() => {
        setLoad(false)

      })
  }

  function Bio() {
    return (
      <View style={{
        backgroundColor: app.tema,
        padding: 15,
        alignItems: "flex-start",
        gap: 15,
      }}>

        <View>
          <Text style={{ fontFamily: 'Roboto-Medium', color: '#fff', fontSize: 18 }}>Sobre nós</Text>
          <Text style={{ fontFamily: 'Roboto-Light', color: '#fff' }}>{loja.bio}</Text>
        </View>
      </View>
    )
  }

  return (

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginVertical: 2 }}
        contentContainerStyle={{ padding: 2 }}
        data={loja?.produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}
      />

  )
}