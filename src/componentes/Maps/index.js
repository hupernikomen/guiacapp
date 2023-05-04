import React from 'react';
import MapView, { Marker } from 'react-native-maps';

import { useTheme } from '@react-navigation/native'

export default function Maps({carrega,width, height, region, marker }) {

    const { colors } = useTheme()
    return (
        <MapView
            onMapReady={carrega} // função chamada quando todo omapa esta carregado
            maxZoomLevel={19}
            minZoomLevel={11}
            style={{ width, height }}
            region={region}>
            {marker &&

                <Marker
                    coordinate={marker}
                    pinColor={colors.tema}
                    loadingEnabled
                />
            }
        </MapView>
    );
}

