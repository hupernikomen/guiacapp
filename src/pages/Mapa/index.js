import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';


import { useRoute } from '@react-navigation/native';

import Maps from '../../componentes/Mapa';

import api from '../../servicos/api';

import { TextoPadrao } from '../../styles';
import Animated, { SlideInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window")
export default function Mapa() {

  const { params } = useRoute()

  const [me, setMe] = useState([])

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
    BuscaMeLoja()
  }, [])

  async function BuscaMeLoja() {
    await api.get(`/loja?lojaID=${params}`)
      .then((response) => {
        setMe(response.data)

        const { latitude, longitude } = JSON.parse(response.data?.latlng)

        setRegion({ latitude: latitude, longitude: longitude, ...delta });
        setMarker({ latitude: latitude, longitude: longitude });
      })
  }



  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 99,
          alignSelf: 'center',
          marginHorizontal: 15,
          top: 15,
          right: 0,
          left: 0,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 15,
          elevation: 3,
          backgroundColor: '#ffffff',
          opacity: .9
        }}
        entering={SlideInUp.duration(800).delay(800)}>
        <TextoPadrao>
          {me?.endereco}
        </TextoPadrao>

        <TextoPadrao>
          {me?.referencia}
        </TextoPadrao>
      </Animated.View>
      <Maps
        width={width}
        height={height}
        region={region}
        marker={marker}
        zoom={11}
      />
    </>
  );
}

