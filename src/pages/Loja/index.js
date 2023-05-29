import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import Produto from '../../componentes/Produtos/pdt-feed';

import api from '../../servicos/api';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

import Avatar from '../../componentes/Avatar';

import { BtnIcone } from '../../styles'

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const { colors } = useTheme()

    const [loja, setLoja] = useState([])
    const [load, setLoad] = useState(false)


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
                        {!!loja.bio && <Bio />}
                    </View>
                }
                data={loja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}
            />
        </>
    );
}