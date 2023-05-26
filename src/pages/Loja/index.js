import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';

import Produto from '../../componentes/Produtos/pdt-feed';

import api from '../../servicos/api';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

import { BtnIcone } from '../../styles'

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const { colors } = useTheme()

    const [loja, setLoja] = useState([])

    useEffect(() => {

        BuscaLoja()

    }, [])

    async function BuscaLoja() {
        await api.get(`/loja?lojaID=${route.params}`)
            .then((response) => {
                setLoja(response.data)

            })
    }

    function Header() {
        return (
            <View style={{
                backgroundColor: colors.tema,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                height: 57,
            }}>

                <BtnIcone
                    lado={'center'}
                    onPress={() => navigation.goBack()}>
                    <Material name='arrow-left' size={24} color='#fff' />
                </BtnIcone>

                {loja.logo?.length > 0 && <Image
                    style={{ width: 40, aspectRatio: 1, borderRadius: 25 }}
                    source={{ uri: loja.logo[0].location }}
                />}

                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        marginLeft: 15,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 20,
                        color: '#fff',
                    }}>{loja.nome}</Text>

                <>
                    <BtnIcone
                        lado={'center'}
                        onPress={() => navigation.navigate("Vendedores", loja.id)}>
                        <Material name='whatsapp' size={24} color='#fff' />
                    </BtnIcone>

                    {!!loja.latlng &&
                        <BtnIcone
                            lado={'center'}
                            onPress={() => navigation.navigate("Mapa", loja.id)}>
                            <Material name='google-maps' size={24} color='#fff' />
                        </BtnIcone>
                    }

                </>

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


                    {!!loja.logo?.length ?

                        <Image
                            style={{ width: 60, aspectRatio: 1, borderRadius: 30, borderWidth: .5, borderColor: "#aaa" }}
                            source={{ uri: loja.logo[0]?.location }}
                        /> :
                        <View style={{ width: 60, aspectRatio: 1, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "#ddd" }}>
                            <Text style={{ fontFamily: "Roboto-Black", color: '#000', fontSize: 22 }}>{loja.nome.trim().split(' ')[0].substring(0, 1) + loja.nome.trim().split(' ')[1].substring(0, 1)}</Text>
                        </View>
                    }
                </View>
                <View>

                    <Text style={{ fontFamily: 'Roboto-Medium', color: '#000', fontSize: 18 }}>Sobre nós</Text>
                    <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>{loja.bio}</Text>
                </View>

            </View>
        )
    }


    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
            ListHeaderComponent={
                <View>
                    <Header />
                    {!!loja.bio && <Bio />}
                </View>
            }
            data={loja.produtos}
            renderItem={({ item }) => <Produto item={item} />}
            numColumns={2}
        />
    );
}