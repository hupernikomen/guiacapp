import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import Maps from '../../componentes/Maps';

const { width, height } = Dimensions.get("window")
export default function Mapa() {

    const route = useRoute()
    const navigation = useNavigation()

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

    function CarregaLocUsuario() {
        const { latitude, longitude } = JSON.parse(route.params?.latlng)

        setRegion({ latitude: latitude, longitude: longitude, ...delta });
        setMarker({ latitude: latitude, longitude: longitude });

    }


    return (
        <View>

            <View
                style={{
                    position: 'absolute',
                    zIndex: 99,
                    alignSelf: 'center',
                    top: 10,
                    width: width - 40,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical:10,
                    elevation: 3,
                    backgroundColor: '#ffffff',
                    opacity: .9
                }}>
                <Text
                    style={{ color: '#000' }}>
                    {route.params?.endereco}
                </Text>
                <Text
                    style={{ color: '#000' }}>
                    {route.params?.bairro}
                </Text>
                
                <Text
                    style={{ color: '#000' }}>
                    {route.params?.referencia}
                </Text>
            </View>
            <Maps
                carrega={CarregaLocUsuario}
                width={width}
                height={height}
                region={region}
                marker={marker} />

        </View>
    );
}

