import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Dimensions } from 'react-native'

import { useNavigation, useTheme } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const { width: WIDTH } = Dimensions.get('window')

export default function CarrosselServicos({ data }) {

    const navigation = useNavigation()

    const { colors } = useTheme()

    const RenderItem = ({ data }) => {

        return (

            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => navigation.navigate("DetalheServico", data)}
                style={styles.card}>
                {data.aDomicilio && <Material style={styles.icdomicilio} name='home' size={18} color={colors.destaque} />}
                <Image
                    style={{ aspectRatio: 1, borderRadius: 6 }}
                    source={{ uri: data?.foto[0]?.location }}
                />

                <View style={{
                    padding: 5
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text
                            numberOfLines={2}
                            lineBreakMode='tail'
                            style={styles.titulo}>
                            {data.tipoServico}
                        </Text>
                    </View>

                    <Text
                        numberOfLines={1}
                        style={styles.nome}>
                        {data.nome}
                    </Text>


                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            backgroundColor: '#fff',
            marginBottom: 10,
            paddingBottom: 15,
        }}>
            <Text style={{
                fontFamily: 'Roboto-Bold',
                marginLeft: 20,
                fontSize: 18,
                marginVertical: 15,
                color: '#000'
            }}>Serviços Profissionais</Text>
            <FlatList
                style={{ width: WIDTH }}
                horizontal
                snapToInterval={147}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={<View style={{ paddingHorizontal: 6 }} />}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={data}
                renderItem={({ item }) => <RenderItem data={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 135,

    },
    titulo: {
        textTransform: "uppercase",
        fontFamily: 'Roboto-Bold',
        color: '#000',
    },
    nome: {
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        color: '#000'
    },
    icdomicilio: {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: '#fff',
        right: 0,
        padding: 3,
        borderRadius: 4
    }
})