import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import NetInfo from "@react-native-community/netinfo";

export default function ErroConexao() {
    const navigation = useNavigation()

    function VerificaConexao() {

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                navigation.navigate("Home")
            }
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
    }

    return (
        <View

            style={styles.tela}>
            <Material
                name='wifi-off' size={60} />

            <Text style={styles.info}>
                {`Humm...\n Parece que estamos sem internet`}
            </Text>

            <Pressable
                onPress={VerificaConexao}
            >

                <Text style={styles.info2}>
                    Verifique sua conexão!
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        width: '70%',
        textAlign: 'center',
        color: '#000',
        fontFamily: 'Roboto-Bold',
        marginTop: 50,
        fontSize: 20,
        marginBottom: 20
    },
    info2: {
        width: "70%",
        textAlign: 'center',
        fontFamily: 'Roboto-Light',
        color: '#000'
    }

})