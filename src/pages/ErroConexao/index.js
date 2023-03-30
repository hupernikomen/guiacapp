import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ErroConexao() {

    return (
        <View style={styles.tela}>
            <Material name='wifi-off' size={60} />
            
            <Text style={styles.info}>
                {`Ops...\n Parece que estamos sem internet`}
            </Text>

            <Text style={styles.info2}>
                Verifique sua conexão!
            </Text>

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