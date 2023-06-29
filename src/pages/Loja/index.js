import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable,Image } from 'react-native';

import api from '../../servicos/api';

import Maps from '../../componentes/Mapa';
import Load from '../../componentes/Load';
import Produto from '../../componentes/Produto-Feed';

import { BtnIcone } from '../../styles'

import Material from "react-native-vector-icons/MaterialCommunityIcons"
import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import Animated, { SlideInDown } from 'react-native-reanimated';

export default function Loja() {

  const navigation = useNavigation()
  const route = useRoute()
  const { colors } = useTheme()

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

    console.log(route.params,"route");
  

  }, [])


  if (load) {
    return <Load />
  }

  async function BuscaLoja() {
    setLoad(true)
    await api.get(`/loja?usuarioID=${route.params}`)
      .then(({data}) => {
        setLoja(data)

        const { latitude, longitude } = JSON.parse(data?.latlng)
        
        setRegion({ latitude: latitude, longitude: longitude, ...delta });
        setMarker({ latitude: latitude, longitude: longitude });
        setLoad(false)
      })
      .catch(() => {
        setLoad(false)
        
      })
  }





  function Bio() {
    return (
      <View style={{
        backgroundColor: colors.tema,
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
    <>

      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
        ListHeaderComponent={
          <View>
            {!!loja?.bio && <Bio />}

            {loja?.latlng && <Pressable
              style={{
                margin: 8,
                backgroundColor: '#fff',
                alignItems: "flex-start",
                elevation: 1
              }}
              onPress={() => navigation.navigate("Mapa", loja.id)}
            >

              <Maps
                width={'100%'}
                height={100}
                region={region}
                marker={marker}
                zoom={16}
              />
            </Pressable>}
          </View>
        }
        data={loja?.produtos}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}
      />


      <Animated.View
        style={{
          width: 60,
          aspectRatio: 1,
          borderRadius: 60 / 2,
          position: 'absolute',
          zIndex: 9999,
          right: 15,
          bottom: 25,
          backgroundColor: colors.tema,
          elevation: 5
        }}
        entering={SlideInDown}

      >
        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          background={colors.tema}
          onPress={() => navigation.navigate("Vendedores", loja.usuarioID)}>

          <Material name='whatsapp' size={26} color='#fff' />
        </Pressable >
      </Animated.View >
    </>
  )
}