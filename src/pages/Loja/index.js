import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import Produto from '../../componentes/Pdt-feed';

import api from '../../servicos/api';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import Maps from '../../componentes/Mapa';

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

import Avatar from '../../componentes/Avatar';

import { BtnIcone, BtnCanto } from '../../styles'
import Load from '../../componentes/Load';
import Animated, {SlideInDown} from 'react-native-reanimated';

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

        console.log(loja.latlng);


    }, [])


    if (load) {
        return <Load />
      }

    async function BuscaLoja() {
        setLoad(true)
        await api.get(`/loja?lojaID=${route.params}`)
            .then((response) => {
                setLoja(response.data)

                if(!response.data.latlng ) {
                    setLoad(false)
                    return
                }
                
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
                zIndex:999,
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
                backgroundColor: colors.tema,
                padding: 15,
                alignItems: "flex-start",
                gap: 15,
            }}>

                <View>
                    <Text style={{ fontFamily: 'Roboto-Medium', color: '#fff', fontSize: 18 }}>Sobre nós</Text>
                    <Text style={{ fontFamily: 'Roboto-Light', color: '#fff' }}>{loja.bio}</Text>
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

                        {loja.latlng && <Pressable
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
                                height={100}
                                region={region}
                                marker={marker}
                                zoom={16}
                            />
                        </Pressable>}
                    </View>
                }
                data={loja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}
            />

            <Animated.View
            entering={SlideInDown.delay(800)}
            
            style={{
                position:'absolute',
                zIndex: 9999,
                right: 15,
                bottom:25,
                backgroundColor:colors.tema,
                width:55,
                aspectRatio: 1,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent:'center',
                elevation: 5
            }}
            
                background={colors.tema}
                onPress={() => navigation.navigate("Vendedores", loja.id)}>
                <Material name='whatsapp' size={26} color='#fff' />
            </Animated.View>
        </>
    )
}