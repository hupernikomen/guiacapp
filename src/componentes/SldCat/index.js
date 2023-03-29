import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import api from '../../servicos/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SldCat() {

    const navigation = useNavigation()
    const { colors } = useTheme()

    const [categorias, setCategorias] = useState([])

    const [busca, setBusca] = useState('')

    useEffect(() => {
        ListaCategorias()
    }, [])

    async function ListaCategorias() {
        await api.get('/categorias')
            .then((response) => {
                shuffleArray(response.data);
            })
            .catch((error) => {
                console.log(error, "categorias");
            })
    }

    function shuffleArray(arr) {

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setCategorias(arr);
    }

    const RenderItem = ({ item }) => {
        if (item._count.produto == 0) return

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Categorias", item)}
                activeOpacity={.9}
                style={{
                    height: 55,
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'Roboto-Regular',
                    color: '#fff'
                }}>
                    {item.nome}
                </Text>
            </TouchableOpacity>
        )
    }

    function BuscarItem() {
            navigation.navigate("Search", busca)
        }

        return (
            <>
                <FlatList
                    style={{ backgroundColor: colors.tema, elevation: 5, marginBottom: 6 }}
                    ListHeaderComponent={
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Search")}
                            style={{
                                backgroundColor: colors.tema,
                                zIndex: 999,
                                height: 55,
                                width: 55,
                                alignItems: "center",
                                justifyContent: 'center',
                            }}>
                            <Icon name='magnify' size={26} color='#fff' />
                        </TouchableOpacity>
                    }
                    ListFooterComponent={<TextInput />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categorias}
                    renderItem={({ item }) => <RenderItem item={item} />}

                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        marginBottom: 5
                    }}>

                    <TextInput
                        value={busca}
                        onChangeText={setBusca}
                        style={{
                            flex: 1,
                            marginHorizontal: 16,
                            marginVertical: 5,
                            paddingHorizontal: 20,
                            borderRadius: 45 / 2,
                            height: 45,
                            elevation: 1,
                            backgroundColor: "#fff"
                        }}
                        placeholder='O que você procura?' />
                    <TouchableOpacity
                        onPress={BuscarItem}
                        style={{
                            position: 'absolute',
                            right: 20,
                            padding: 10,
                        }}>
                        <Icon name='magnify' size={26} color='#222'/>
                    </TouchableOpacity>
                </View>
            </>
        )
    }