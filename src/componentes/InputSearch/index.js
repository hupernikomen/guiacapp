import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function InputSearch({ navigation }) {

    const { colors } = useTheme()
    const [busca, setBusca] = useState('')

    function BuscarItem() {
        navigation.navigate("Search", busca)
        setBusca('')
    }

    return (
        <View
            style={styles.container}>

            <TextInput
                placeholderTextColor={'#000'}
                value={busca}
                onChangeText={setBusca}
                style={styles.input}/>

            <TouchableOpacity
                onPress={BuscarItem}
                style={[styles.btnsearch,{backgroundColor:colors.tema}]}>

                <Icon name='magnify' size={26} color='#fff' />
            </TouchableOpacity>

            <View style={styles.transp} />
        </View>
    );
}

const styles = StyleSheet.create({


    container: {
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 55 / 2,
        padding: 8,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    transp: {
        backgroundColor: '#fff',
        opacity: .7,
        position: 'absolute',
        width: '110%',
        zIndex: -1,
        height: 65,

    },
    input: {
        backgroundColor: '#fff',
        elevation: 5,
        height: 45,
        borderRadius: 45 / 2,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    btnsearch: {
        zIndex: 99,
        alignSelf: 'center',
        alignItems:'center',
        right: 9,
        height:43,
        width:48,
        borderRadius:44/2,
        position: 'absolute',
        justifyContent: 'center'
    }
})