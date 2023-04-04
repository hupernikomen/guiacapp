import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoLoja';

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useIsFocused, useTheme } from '@react-navigation/native';

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const focus = useIsFocused()
    const { colors } = useTheme()

    const [infoLoja, setInfoLoja] = useState([])

    useEffect(() => {

        setInfoLoja(route.params)

    }, [focus])

    useEffect(() => {
        navigation.setOptions({
            title: infoLoja.nome,
            headerRight: () =>
                <TouchableOpacity
                    activeOpacity={.9}
                    onPress={() => navigation.navigate("Mapa", infoLoja)}>

                    <Icon name='google-maps' size={30} color={'#fff'} />
                </TouchableOpacity>

        })

    }, [infoLoja])

    return (
        <View style={styles.tela}>


            <FlatList
                columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 8 }}
                data={infoLoja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}

            />

            <TouchableOpacity
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${infoLoja.telefone}`)}
                style={{
                    backgroundColor: colors.vartema,
                    position: "absolute",
                    bottom: 30,
                    right: 20,
                    width: 55,
                    height: 55,
                    borderRadius: 55 / 2,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Icon name='whatsapp' color='#fff' size={30} />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1
    }
})