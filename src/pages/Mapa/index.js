import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Dimensions,
  PermissionsAndroid,
  Pressable,
  Text
  
} from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get("window")
import Geolocation from '@react-native-community/geolocation';

import api from '../../servicos/api';

import { useTheme, useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {

  const {app} = useTheme()

  const navigation = useNavigation()
  const route = useRoute()
  const [marker, setMarker] = useState(null)
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null)

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


  useEffect(() => {
    
    PegarMinhaLocalizacao()
    permissaoLocalizacao()
    CarregaLocUsuario()

  }, [])



  function PegarMinhaLocalizacao() {

    Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      // Pega latitude e long do usuario e passa para seu useState que mostra a region do mapview
      setMinhaLocalizacao({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    },
      (error) => {
        console.log('Não foi possível obter a localização');
      }, {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000,
      showLocationDialog: true
    }
      //showLocationDialog: essa função convida automaticamente o usuário a ativar o GPS, caso esteja desativado.
      //enableHighAccuracy: vai solicitar a ativação do GPS e coletar os dados dele
      //timeout: determina o tempo máximo para o dispositivo coletar uma posição
      //maximumAge: tempo máximo para coleta de posição armazenada em cache);
    )
  };

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


  async function CarregaLocUsuario() {

    await api.get(`/mapa?usuarioID=${route.params}`)
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
            paddingLeft: 10,
            width: 45,
            aspectRatio: 1,
          }}>

            <Feather name='arrow-left' size={24} color={'#fff'} />



          </Pressable>

          <View style={{
            flex:1,
            marginRight:5,
            marginLeft:10
          }}>


            <Text numberOfLines={1} lineBreakMode='tail' style={{
              fontFamily: 'Roboto-Medium',
              color: '#fff',
              fontSize: 20,
            }}>
              Localização
            </Text>
            {/* <Text style={{
              fontFamily: 'Roboto-Light',
              color: '#fff',
              fontSize: 11,
            }}>
              {produtos?.length} produto{produtos?.length > 1 ? 's' : ''}
            </Text> */}
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
            <Pressable onPress={() => navigation.navigate("Search")} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Feather name='search' size={app.icone} color={app.texto} />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }



  return (
    <View>

      <Header/>

      <MapView
        showsUserLocation={true}
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