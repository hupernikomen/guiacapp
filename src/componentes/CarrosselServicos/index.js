import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Dimensions } from 'react-native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation, useTheme } from '@react-navigation/native'

const { width } = Dimensions.get('window')
export default function CarrosselServicos({ data }) {

    const navigation = useNavigation()

    const { colors } = useTheme()

    const RenderItem = ({ data }) => {

        return (
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => navigation.navigate("DetalheServico", data)}
                style={[styles.card, { backgroundColor: colors.tema }]}>

                <Image
                    style={{ aspectRatio: 1 }}
                    source={{ uri: `http://192.168.0.103:3333/files/servico/${data?.foto[0]?.filename}` }}
                />

                <View style={{
                    padding: 20
                }}>


                    <View style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text
                            lineBreakMode='tail'
                            style={styles.titulo}>
                            {data.tipoServico}
                        </Text>
                    </View>

                    <Text
                        style={styles.nome}>
                        {data.nome}
                    </Text>

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            paddingVertical: 10,
            marginBottom: 10,
            backgroundColor: '#fff',
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

                    {/* <Material name='account-wrench-outline' size={28} color={colors.vartema} /> */}
                    <Text style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: 15,
                        color: '#000'
                    }}>
                        SERVIÇOS PROFISSIONAIS
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Servicos")}>
                    <Text style={{
                        color: '#000',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 12,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        borderRadius:15,
                        marginVertical:5,
                        backgroundColor:colors.destaque
                    }}>
                        VER TODOS
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                ItemSeparatorComponent={<View style={{ width: 15 }} />}
                contentContainerStyle={{ padding: 12 }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width - 65}
                horizontal
                data={data}
                renderItem={({ item }) => <RenderItem data={item} />}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        width: width - 80,

        // elevation: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden'
    },
    titulo: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: "#fff",
    },
    nome: {
        fontFamily: 'Roboto-Light',
        fontSize: 13,
        color: '#fff',
    },
    bio: {
        fontFamily: 'Roboto-Light',
        fontSize: 13,
        color: '#fff'
    }
})