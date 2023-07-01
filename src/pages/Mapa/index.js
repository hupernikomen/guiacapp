import React, { useState, useContext,useCallback } from 'react';
import {
  View,
  Dimensions,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';

const { width, height } = Dimensions.get("window")

import api from '../../servicos/api';

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {

  const { credenciais } = useContext(LojaContext)


  const [marker, setMarker] = useState(null)

  const { colors } = useTheme()

  const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const [region, setRegion] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067,
    ...delta
  })


  useFocusEffect(
    useCallback(() => {
      let ativo = true
      CarregaLocUsuario()
      return () => {
        ativo = false
      }
    }, [])
  )

  // Verificar se o app permissão para acessar localização
  const permissaoLocalizacao = async () => {
    try {
      const autorizado = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Geolocalização',
          message: 'Podemos acessar sua localização?',
          buttonNeutral: 'Lembre-me mais tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );

      if (autorizado === 'granted') {
        return true
      } else {
        return false
      }

    } catch (err) {
      return false;
    }
  };




  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };



  async function CarregaLocUsuario() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/mapa?usuarioID=${credenciais.id}`, { headers })
      .then((response) => {
        const { latitude, longitude } = response.data?.latlng

        setMarker({ latitude: latitude, longitude: longitude });
        setRegion({ latitude: latitude, longitude: longitude, ...delta });

      })
      .catch((err) => {
        // TRATAR ESSE MOMENTO DE ERRO
        console.log(err);
      })

  }


  return (
    <View>

      <MapView
        maxZoomLevel={20}
        loadingEnabled={true}
        minZoomLevel={12}
        mapType='standard'
        style={{ width, height }}
        region={region}
      >
        <Marker
          coordinate={marker || {
            latitude: -5.1036423,
            longitude: -42.7516067,
          }}
          pinColor={colors.tema}
          loadingEnabled
        />
      </MapView>
    </View>
  );
}