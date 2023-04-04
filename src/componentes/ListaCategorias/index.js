import React from 'react';
import { TouchableOpacity, Text, FlatList } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';


export default function ListaCategorias({ data }) {

    const navigation = useNavigation()
    const { colors } = useTheme()

    const RenderItem = ({ item }) => {
        if (item._count.produto === 0) return

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Categorias", item)}
                activeOpacity={.9}
                style={{
                    height: 45,
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                }}>
                <Text style={{
                    textTransform:'uppercase',
                    fontFamily: 'Roboto-Regular',
                    fontSize:13,
                    color: '#fff',
                }}>
                    {item.nome}
                </Text>
            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 10}}
            style={{ backgroundColor: colors.tema_2, elevation:15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}