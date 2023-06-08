import React from 'react';
import MapView, { Marker } from 'react-native-maps';

import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native';

export default function Maps({avatar,carrega,width, height, region, marker, zoom }) {

    const { colors } = useTheme()
    return (
        <MapView
            onMapReady={carrega} // função chamada quando todo omapa esta carregado
            maxZoomLevel={19}
            minZoomLevel={zoom}// colocar 16 para Page Loja - 11
            mapType='terrain'
            // showsBuildings={false}
            style={{ width, height }}
            region={region}>
            {marker &&

                <Marker
                    title='Teste'
                    coordinate={marker}
                    pinColor={colors.tema}
                    loadingEnabled
                >
                    {/* <Image source={{uri:avatar}}style={{height: 35, width:35 }} /> */}
                </Marker>
            }
        </MapView>
    );
}

