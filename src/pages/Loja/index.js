import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';

import Produto from '../../componentes/Produtos/pdt-feed';

import api from '../../servicos/api';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import Maps from '../../componentes/Maps';

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

import Avatar from '../../componentes/Avatar';

import { BtnIcone, BtnCanto } from '../../styles'

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


    }, [])


    if (load) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <ActivityIndicator color={colors.tema} />
            </View>
        )
    }

    async function BuscaLoja() {
        setLoad(true)
        await api.get(`/loja?lojaID=${route.params}`)
            .then((response) => {
                setLoja(response.data)

                const { latitude, longitude } = JSON.parse(response.data?.latlng)

                setRegion({ latitude: latitude, longitude: longitude, ...delta });
                setMarker({ latitude: latitude, longitude: longitude });
                setLoad(false)
            })
    }

    function Header() {
        return (
            <View style={{
                width: '100%',
                backgroundColor: colors.tema,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                height: 55,
                elevation: 5
            }}>

                <BtnIcone
                    lado={'center'}
                    onPress={() => navigation.goBack()}>
                    <Material name='arrow-left' size={24} color='#fff' />
                </BtnIcone>

                <Avatar DATA={loja} WIDTH={40} SIZE={18} />

                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 20,
                        marginLeft: 10,
                        color: '#fff',
                    }}>{loja.nome}</Text>

            </View>
        )
    }



    function Bio() {
        return (
            <View style={{
                margin: 8,
                backgroundColor: '#fff',
                padding: 15,
                alignItems: "flex-start",
                gap: 15,
                borderRadius: 4
            }}>

                <View>
                    <Text style={{ fontFamily: 'Roboto-Medium', color: '#000', fontSize: 18 }}>Sobre nós</Text>
                    <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>{loja.bio}</Text>
                </View>
            </View>
        )
    }



    return (
        <>
            <Header />

            <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
                ListHeaderComponent={
                    <View>
                        <Pressable
                        style={{
                            margin: 8,
                            backgroundColor: '#fff',
                            alignItems: "flex-start",
                            elevation:1
                        }}
                            onPress={() => navigation.navigate("Mapa", loja.id)}
                        >

                            <Maps
                                width={'100%'}
                                height={120}
                                region={region}
                                marker={marker}
                                zoom={16}
                            />
                        </Pressable>
                        {!!loja.bio && <Bio />}
                    </View>
                }
                data={loja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}
            />

            <BtnCanto
                background={colors.tema}
                onPress={() => navigation.navigate("Vendedores", loja.id)}>
                <Material name='whatsapp' size={26} color='#fff' />
            </BtnCanto>
        </>
    );
}