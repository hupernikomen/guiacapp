import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const { colors } = useTheme()


    function Header() {
        return (
            <View style={{
                backgroundColor: colors.tema,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                height: 57,
            }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ height: 50, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Material name='arrow-left' size={26} color='#fff' />
                </TouchableOpacity>

                <Image
                    style={{ width: 40, aspectRatio: 1, borderRadius: 25 }}
                    source={{ uri: route.params?.logo[0].location }}
                />

                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        marginLeft: 15,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 20,
                        color: '#fff',
                    }}>{route.params?.nome}</Text>

                <View style={{
                    right: 0,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Vendedores", route.params?.vendedores)}
                        style={{ height: 50, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Material name='whatsapp' size={26} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Mapa", route.params)}
                        style={{ height: 50, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Material name='google-maps' size={26} color='#fff' />
                    </TouchableOpacity>

                </View>

            </View>
        )

    }

    return (
        <FlatList
            ListHeaderComponent={<Header />}
            data={route.params?.produtos}
            renderItem={({ item }) => <Produto item={item} />}
            numColumns={2}
        />
    );
}