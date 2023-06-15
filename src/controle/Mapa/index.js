import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  Alert,
  Pressable,
  PermissionsAndroid,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';

const { width, height } = Dimensions.get("window")

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import Geolocation from 'react-native-geolocation-service';

import { useTheme } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {

  const { credenciais } = useContext(LojaContext)

  const [carregado, setCarregando] = useState(false)

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

  // Checar Permissão e Pegar Locaização Automatica
  const getLocation = () => {
    setCarregando(true)

    const permissao = permissaoLocalizacao();
    permissao.then(response => {
      if (response) {
        Geolocation.getCurrentPosition(
          position => {
            SalvarLatlng(position.coords?.latitude, position.coords?.longitude)
          },
          error => {
            console.log(error);
            setCarregando(false)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
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
    await api.get(`/loja?lojaID=${credenciais.id}`, { headers })
      .then((response) => {

        const { latitude, longitude } = JSON.parse(response.data?.latlng)

        setMarker({ latitude: latitude, longitude: longitude });
        setRegion({ latitude: latitude, longitude: longitude, ...delta });

      })
      .catch((err) => {
        // TRATAR ESSE MOMENTO DE ERRO
        console.log(err);
      })

  }

  async function CapturaLatLng(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate
    // Perguntar se quer salvar novo marker
    setMarker({
      latitude,
      longitude
    })

    SalvarLatlng(latitude, longitude)
    Toast("Localização Atualizada")

  }


  async function SalvarLatlng(latitude, longitude) {

    const formData = new FormData()

    formData.append('latlng', JSON.stringify({ latitude, longitude }))

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/loja?lojaID=${credenciais.id}`, formData, { headers })
      .then(() => {
        CarregaLocUsuario()
        setCarregando(false)

      })
      .catch((err) => {
        console.error(err.response, "catch Error");
        setCarregando(false)
      })
  }

  return (
    <View>

      <Pressable
        activeOpacity={.8}
        onPress={getLocation}
        style={{
          position: 'absolute',
          zIndex: 99,
          marginTop: 10,
          backgroundColor: '#fff',
          height: 55,
          alignSelf: "center",
          alignItems: 'center',
          flexDirection: "row",
          elevation: 5,
          borderRadius: 55 / 2,
          paddingHorizontal: 20
        }}>

        <Text style={{ color: '#000', fontFamily: 'Roboto-Regular', fontSize: 15 }}>Capturar localização atual</Text>
        <View
          activeOpacity={.7}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 58 / 2,
            opacity: .8,
            marginLeft: 15
          }}>

          {permissaoLocalizacao && <View style={{
            width: 8,
            aspectRatio: 1,
            backgroundColor: '#0066ff',
            position: 'absolute',
            borderRadius: 5
          }} />}

          {carregado ?
            <ActivityIndicator size={22} color={'#0066ff'} />
            :
            <Material name='crosshairs' size={25} color={'#0066ff'} />
          }


        </View>
      </Pressable>


      <MapView
        // onMapReady={CarregaLocUsuario} // função chamada quando todo omapa esta carregado
        maxZoomLevel={20}
        loadingEnabled={true}
        minZoomLevel={12}
        mapType='standard'
        style={{ width, height }}
        region={region}
      >
        <Marker
          draggable
          onDragEnd={CapturaLatLng}
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