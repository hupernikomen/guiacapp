import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { Dimensions } from 'react-native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation, useTheme } from '@react-navigation/native'

const { width } = Dimensions.get('window')
export default function CarrosselServicos({data}) {

    const navigation = useNavigation()

    const { colors } = useTheme()

    const RenderItem = ({ data }) => {

        return (
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => navigation.navigate("DetalheServico", data)}
                style={styles.card}>

                <View style={{
                    flexDirection:"row",
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <Text
                        style={styles.titulo}>
                        {data.tipoServico}
                    </Text>
                    <Material name='menu-right' size={22} color={colors.vartema}/>
                </View>

                <Text
                    style={styles.nome}>
                    {data.nome}
                </Text>

                <Text
                    numberOfLines={1}
                    style={styles.bio}>
                    {data.bio}
                </Text>

            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            paddingVertical: 20,
        }}>
            <View style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>

                    <Material name='room-service-outline' size={28} color={colors.vartema} />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 17,
                        color: '#000'
                    }}>
                        Serviços
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Servicos")}>
                    <Text style={{
                        color: '#000',
                        fontFamily: 'Roboto-Light',
                        fontSize: 13,
                        paddingVertical: 5
                    }}>
                        Ver Todos
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={{ padding: 10 }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width - 70}
                horizontal
                data={data}
                renderItem={({ item }) => <RenderItem data={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        width: width - 80,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 8,
        elevation: 1
    },
    titulo: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: "#000",
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 13,
        color: '#000',
    },
    bio: {
        fontFamily: 'Roboto-Light',
        fontSize: 13,
        color: '#000'
    }
})