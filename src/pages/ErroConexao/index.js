import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ErroConexao() {

    return (
        <View style={styles.tela}>
            <Material name='wifi-off' size={50} />
            
            <Text style={styles.info}>
                {`Ops...\n Parece que estamos sem sinal de internet`}
            </Text>

            <Text style={styles.info2}>
                Assim que normalizar redirecionaremos para o nosso feed
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
        marginTop: 20,
        fontSize: 20,
        marginBottom: 50
    },
    info2: {
        width: "70%",
        textAlign: 'center',
        fontFamily: 'Roboto-Light',
        color: '#000'
    }

})