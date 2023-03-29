import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoLoja';

import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useIsFocused,useTheme } from '@react-navigation/native';

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const focus = useIsFocused()
    const {colors} = useTheme()

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

                    <Icon name='google-maps' size={30} color={colors.background} />
                </TouchableOpacity>

        })

    }, [infoLoja])

    return (
        <View style={styles.tela}>

            <TouchableOpacity
                style={{ marginBottom: 10, alignSelf: 'flex-end' }}
                activeOpacity={.9}
                onPress={() => navigation.navigate("Mapa", infoLoja.latlng)}>

            </TouchableOpacity>

            <FlatList
                columnWrapperStyle={{ margin: 4 }}
                data={infoLoja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}

            />

            <TouchableOpacity
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${infoLoja.telefone}`)}
                style={{
                    backgroundColor: colors.tema,
                    elevation: 5,
                    height: 55,
                    width: 55,
                    alignItems: "center",
                    justifyContent: 'center',
                    borderRadius: 55 / 2,
                    position: 'absolute',
                    zIndex: 999,
                    right: 10,
                    bottom: 30
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