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

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    setCarregando(true)

    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            // setLocation(position);
            SalvarLatlng(position.coords.latitude, position.coords.longitude)

          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setCarregando(false)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };


  const ToastOK = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const [region, setRegion] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067,
    ...delta
  })


  async function CarregaLocUsuario() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/loja?lojaID=${credenciais.id}`, { headers })
      .then((response) => {
        if (response.data?.latlng == null) {
          return
        }
        const { latitude, longitude } = JSON.parse(response.data?.latlng)

        setMarker({ latitude: latitude, longitude: longitude });
        setRegion({ latitude: latitude, longitude: longitude, ...delta });

      })

  }

  async function CapturaLatLng(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate
    // Perguntar se quer salvar novo marker
    setMarker({
      latitude,
      longitude
    })
    setTimeout(() => {
      Alert.alert("Mudar Localização?", "Caso confirme sua localização será alterada...", [
        {
          text: "Sim",
          onPress: () => {

            SalvarLatlng(latitude, longitude)
          },
        },
        {
          text: "Não",
          onPress: () => {
            CarregaLocUsuario()
          }
        },
      ])
    }, 300);
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
        ToastOK("Localização Registrada")

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
          marginTop: 5,
          backgroundColor: '#fff',
          height: 60,
          width: '97%',
          alignSelf: "center",
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: "row",
          elevation: 5,
          borderRadius: 6
        }}>

        <Text style={{ color: '#000', fontFamily: 'Roboto-Regular', fontSize: 15 }}>Capturar localização automaticamente</Text>
        <View
          activeOpacity={.7}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 58,
            borderRadius: 58 / 2,
            opacity: .8,
          }}>

          {requestLocationPermission && <View style={{
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
      <View style={{ marginTop: 70, backgroundColor: '#fff', zIndex: 9, width: '100%', padding: 5, opacity: .8, position: 'absolute' }}>
        <Text style={{ alignSelf: 'center', color: '#000', fontFamily: 'Roboto-Regular' }}>Ou selecione no mapa sua localização com um toque</Text>
      </View>




      <MapView
        onMapReady={CarregaLocUsuario} // função chamada quando todo omapa esta carregado
        maxZoomLevel={20}
        loadingEnabled={true}

        minZoomLevel={12}
        mapType='standard'
        onPress={CapturaLatLng}
        style={{ width, height }}
        region={region}
      >
        {marker &&

          <Marker

            coordinate={marker}
            pinColor={colors.tema}
            loadingEnabled
          />
        }
      </MapView>
    </View>
  );
}