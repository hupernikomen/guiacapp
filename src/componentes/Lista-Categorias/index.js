import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';
import api from '../../servicos/api';
import estilo from './estilo';

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
                style={estilo.botao}>
                <Text style={estilo.texto_botao}>
                    {item.nome}
                </Text>

            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            contentContainerStyle={{ marginHorizontal: 5 }}
            style={{ backgroundColor: colors.tema }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categorias}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}
