import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Menu() {

    const navigation = useNavigation()
    const { colors } = useTheme()

    return (
        <View style={styles.tela}>

            <View style={styles.secao}>

                <Text style={[styles.item, { margin: 15, textAlign: "center" }]}>

                    Aplicativo de anúncios de mercadorias e serviços. Aproximando lojistas, profissionais e clientes.
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("Anuncie")}
                style={styles.btnmenu}>
                <Text style={styles.itemmenu}>Seja um anunciante</Text>
                <Material name='chevron-right' color={colors.destaque} size={25} />
            </TouchableOpacity>


            <TouchableOpacity

                onPress={() => navigation.navigate("Lojas")}
                style={styles.btnmenu}>
                <Text style={styles.itemmenu}>Encontre Lojas</Text>
                <Material name='chevron-right' color={colors.destaque} size={25} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Servicos")}
                style={styles.btnmenu}>
                <Text style={styles.itemmenu}>Encontre Profissionais</Text>
                <Material name='chevron-right' color={colors.destaque} size={25} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
                style={styles.btnmenuult}>
                <Text style={styles.itemmenu}>Fale com o Guia</Text>
                <Material name='chevron-right' color={colors.destaque} size={25} />
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },
    secao: {
        borderBottomWidth: .5,
        borderBottomColor: '#ffffff90',
        marginVertical: 5,
        paddingBottom: 25
    },
    btnmenu: {
        backgroundColor: '#f1f1f199',
        padding: 15,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 2
    },
    btnmenuult: {
        backgroundColor: '#f1f1f199',
        padding: 15,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 60,

    },
    itemdestaque: {
        marginBottom: 5,
        fontFamily: 'Roboto-Bold',
        color: '#000',
        fontSize: 24
    },
    item: {
        color: '#000',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    itemmenu: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    }
})