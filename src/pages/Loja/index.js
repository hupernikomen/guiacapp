import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';

import api from '../../servicos/api';

import Load from '../../componentes/Load';
import Produto from '../../componentes/Produto-Feed';


import Feather from "react-native-vector-icons/Feather"
import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

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

  function Header() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: app.tema,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex:1
        }}>

          <Pressable onPress={() => navigation.goBack()} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10
          }}>

            <Feather name='arrow-left' size={24} color={'#fff'} />


            {
              loja?.avatar && <Image source={{ uri: loja?.avatar?.location }} style={{
                width: 40,
                marginHorizontal: 10,
                aspectRatio: 1,
                borderRadius: 99
              }} />
            }

          </Pressable>

          <View style={{
            flex:1,
            marginRight:5
          }}>


            <Text numberOfLines={1} lineBreakMode='tail' style={{
              fontFamily: 'Roboto-Medium',
              color: '#fff',
              fontSize: 18,
            }}>
              {loja.nome}
            </Text>
            <Text style={{
              fontFamily: 'Roboto-Light',
              color: '#fff',
              fontSize: 11,
            }}>
              {loja?.produtos?.length} produto{loja?.produtos?.length > 1 ? 's' : ''}
            </Text>
          </View>

        </View>
        <View>
          <View style={{ flexDirection: 'row', gap: 2 }}>

            <Pressable onPress={() => navigation.navigate("Contato", loja?.usuario?.id)} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Feather name='message-circle' size={app.icone} color='#fff' />
            </Pressable>
            {loja?.usuario?.mapa && <Pressable onPress={() => navigation.navigate('Mapa', loja?.usuario?.id)} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Feather name='map' size={app.icone} color={app.texto} />
            </Pressable>}
          </View>
        </View>
      </View>
    )
  }

  return (
    <>
      <Header />

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginVertical: 2, gap: 4, paddingHorizontal: 4 }}
        data={loja?.produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}
      />
    </>

  )
}