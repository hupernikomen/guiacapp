import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import { useRoute } from '@react-navigation/native';

import Maps from '../../componentes/Maps';

import api from '../../servicos/api';

import { Card } from './styles';
import { TextoPadrao } from '../../styles';

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
            <Card
                width={width - 40}>
                <TextoPadrao>
                    {me?.endereco}
                </TextoPadrao>
                <TextoPadrao>
                    {me?.bairro}
                </TextoPadrao>

                <TextoPadrao>
                    {me?.referencia}
                </TextoPadrao>
            </Card>
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

