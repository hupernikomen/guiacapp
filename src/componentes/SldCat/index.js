import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import api from '../../servicos/api';

export default function SldCat() {

    const navigation = useNavigation()
    const { colors } = useTheme()

    const [categorias, setCategorias] = useState([])

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
                    height: 50,
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                }}>
                <Text style={{
                    fontSize: 14,
                    fontFamily: 'Roboto-Light',
                    color: '#fff',
                    opacity:.95
                }}>
                    {item.nome}
                </Text>
            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            style={{ backgroundColor: colors.tema }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categorias}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}