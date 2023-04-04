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
                source={{ uri: `http://192.168.0.103:3333/files/logo/${loja.logo[0].filename}` }}
                style={styles.logo} />

            <View
                style={styles.containerinfo}>

                <Text
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
        maxWidth: (width / 2) - 12,
        overflow:'hidden',
        padding:5
    },
    logo: {
        aspectRatio: 1,
        flex: 1,
    },
    containerinfo: {
        padding:10
    },
    nomeloja: {
        color: '#000',
        fontFamily: "Roboto-Medium",
        fontSize:16
    },
    contagem: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Roboto-Light'
    }
})