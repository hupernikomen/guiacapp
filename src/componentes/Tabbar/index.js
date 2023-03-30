import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme, useNavigation } from '@react-navigation/native';

export default function Tabbar() {
    const { colors } = useTheme()
    const navigation = useNavigation()

    return (
        <View style={styles.tela}>


            <TouchableOpacity
                activeOpacity={.9}
                style={[styles.botao, { backgroundColor: colors.tema }]}
                onPress={() => navigation.navigate("Lojas")}>
                <Material name='storefront-outline' size={24} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.9}
                style={[styles.botao, { backgroundColor: colors.tema }]}>
                <Material name='menu' size={24} color={'#fff'} />
            </TouchableOpacity>

            <View style={styles.transp} />
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        position: 'absolute',
        zIndex: 999,
        bottom: 10,
        alignSelf: "center",
        borderRadius: 55 / 2,
        borderWidth:1,
        borderColor:'#fff',
        overflow: 'hidden'
    },
    botao: {
        margin: 5,
        height:45,
        width:45,
        alignItems:'center',
        justifyContent:'center',
        zIndex: 9,
        borderRadius: 26,
        elevation:5
    },
    transp: {
        backgroundColor: '#fff',
        position: 'absolute',
        height: 55,
        width: '110%',
        opacity: .7,
    }
})