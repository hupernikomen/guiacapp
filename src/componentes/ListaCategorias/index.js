import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList, View, StyleSheet } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';
import api from '../../servicos/api';


export default function ListaCategorias() {
    const navigation = useNavigation()
    const { colors } = useTheme()

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        BuscaCategorias()
    }, [])

    async function BuscaCategorias() {

        await api.get('/categorias')
            .then((response) => {
                let embaralhado = shuffle(response.data)
                setCategorias(embaralhado)
            })
            .catch((error) => { if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") } })
    }

    function shuffle(arr) {

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr
    }

    const RenderItem = ({ item }) => {
        if (item._count.produto === 0) return



        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Categorias", item)}
                activeOpacity={.9}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                }}>



                <Text style={{
                    textTransform: 'uppercase',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 13,
                    color: '#fff',
                }}>
                    {item.nome}
                </Text>

                <View style={{
                    position: 'absolute',
                    right: 5,
                    top: 10
                }}>

                </View>


            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            style={{ backgroundColor: colors.tema }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categorias}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}
