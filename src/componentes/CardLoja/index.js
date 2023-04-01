import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const width = Dimensions.get('window').width

import { useNavigation } from '@react-navigation/native';

export default function CardLoja({ loja }) {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Loja', loja)}
            activeOpacity={.9}
            style={styles.containerloja}>
            <View style={{
                backgroundColor: '#ddd',
                height: 60
            }}>
                {/* <Image
                    style={{ height: 50 }}
                    source={{ uri: `` }} /> */}
            </View>

            <Text style={{
                position:'absolute',
                right:10,
                top:55,
                backgroundColor:'#fff',
                paddingHorizontal:5,
                borderRadius:4,
                fontSize:12,
                color:'#000'
            }}>{loja.produtos.length} produtos</Text>

            <View style={{
                position: 'absolute',
                left: 10,
                top: 25,

            }}>
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        borderWidth: 2,
                        borderColor: '#fff'
                    }}
                    source={{ uri: `http://192.168.0.103:3333/files/logo/${loja.logo[0].filename}` }} />
            </View>
            <View style={{
                marginTop: 10,
                padding: 10
            }}>
                <Text
                    style={{
                        color: '#000',
                        fontFamily: "Roboto-Medium",
                        fontSize:17
                    }}
                >{loja.nome}</Text>
                <Text
                    numberOfLines={2}
                    style={{
                        color: '#000',
                        fontFamily: "Roboto-Light",
                        fontSize: 12
                    }}
                >{loja.bio}</Text>

   
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerloja: {
        flex: 1,
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 4,
        maxWidth: (width / 2) - 12,

    },
})