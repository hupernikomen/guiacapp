import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width

import { useNavigation, useTheme } from '@react-navigation/native';

export default function CardLoja({ loja }) {
    const { colors } = useTheme()
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Loja', loja)}
            activeOpacity={.9}
            style={styles.containerloja}>

            <Image
                source={{ uri: loja.logo[0].location }}
                style={styles.logo} />

            <View
                style={styles.containerinfo}>

                <Text
                    numberOfLines={2}
                    style={styles.nomeloja}>
                    {loja.nome}
                </Text>

                <Text
                    style={styles.contagem}>
                    {loja.produtos.length} produtos
                </Text>


            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerloja: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 6,
        marginHorizontal: 4,
        maxWidth: (width / 3) - 12,
        overflow: 'hidden',
        padding: 5
    },
    logo: {
        aspectRatio: 1,
        flex: 1,
    },
    containerinfo: {
        padding: 10
    },
    nomeloja: {
        color: '#000',
        fontFamily: "Roboto-Medium",
    },
    contagem: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Roboto-Light'
    }
})